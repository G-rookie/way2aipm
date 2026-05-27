import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  BaseCheckpointSaver,
  WRITES_IDX_MAP,
  copyCheckpoint,
  getCheckpointId,
} from "@langchain/langgraph-checkpoint";

function checkpointKey(threadId, namespace, checkpointId) {
  return JSON.stringify([threadId, namespace, checkpointId]);
}

function emptyStore() {
  return { storage: {}, writes: {} };
}

export class JsonFileCheckpointSaver extends BaseCheckpointSaver {
  constructor(filePath, serde) {
    super(serde);
    this.filePath = path.resolve(filePath);
    this.writeQueue = Promise.resolve();
  }

  async readStore() {
    await this.writeQueue;
    try {
      return JSON.parse(await readFile(this.filePath, "utf8"));
    } catch (error) {
      if (error.code === "ENOENT") return emptyStore();
      throw error;
    }
  }

  async updateStore(update) {
    const operation = this.writeQueue.then(async () => {
      let store;
      try {
        store = JSON.parse(await readFile(this.filePath, "utf8"));
      } catch (error) {
        if (error.code !== "ENOENT") throw error;
        store = emptyStore();
      }
      await update(store);
      await mkdir(path.dirname(this.filePath), { recursive: true });
      const temporaryPath = `${this.filePath}.tmp`;
      await writeFile(temporaryPath, `${JSON.stringify(store)}\n`, "utf8");
      await rename(temporaryPath, this.filePath);
    });
    this.writeQueue = operation.catch(() => {});
    return operation;
  }

  async encode(value) {
    const [type, bytes] = await this.serde.dumpsTyped(value);
    return { type, data: Buffer.from(bytes).toString("base64") };
  }

  async decode(value) {
    return this.serde.loadsTyped(value.type, Buffer.from(value.data, "base64"));
  }

  async getTuple(config) {
    const threadId = config.configurable?.thread_id;
    const namespace = config.configurable?.checkpoint_ns ?? "";
    if (threadId === undefined) return undefined;
    const store = await this.readStore();
    const checkpoints = store.storage[threadId]?.[namespace];
    if (!checkpoints) return undefined;
    const requestedId = getCheckpointId(config);
    const checkpointId = requestedId || Object.keys(checkpoints).sort((a, b) => b.localeCompare(a))[0];
    const saved = checkpoints[checkpointId];
    if (!saved) return undefined;
    const key = checkpointKey(threadId, namespace, checkpointId);
    const pendingWrites = await Promise.all(
      Object.values(store.writes[key] || {}).map(async ([taskId, channel, value]) => [
        taskId,
        channel,
        await this.decode(value),
      ]),
    );
    const tuple = {
      config: { configurable: { thread_id: threadId, checkpoint_ns: namespace, checkpoint_id: checkpointId } },
      checkpoint: await this.decode(saved.checkpoint),
      metadata: await this.decode(saved.metadata),
      pendingWrites,
    };
    if (saved.parentCheckpointId !== undefined) {
      tuple.parentConfig = {
        configurable: {
          thread_id: threadId,
          checkpoint_ns: namespace,
          checkpoint_id: saved.parentCheckpointId,
        },
      };
    }
    return tuple;
  }

  async *list(config, options = {}) {
    const store = await this.readStore();
    let { limit } = options;
    const threadIds = config.configurable?.thread_id ? [config.configurable.thread_id] : Object.keys(store.storage);
    for (const threadId of threadIds) {
      for (const namespace of Object.keys(store.storage[threadId] || {})) {
        if (config.configurable?.checkpoint_ns !== undefined && namespace !== config.configurable.checkpoint_ns) continue;
        const entries = Object.entries(store.storage[threadId][namespace]).sort(([left], [right]) => right.localeCompare(left));
        for (const [checkpointId] of entries) {
          if (options.before?.configurable?.checkpoint_id && checkpointId >= options.before.configurable.checkpoint_id) continue;
          const tuple = await this.getTuple({
            configurable: { thread_id: threadId, checkpoint_ns: namespace, checkpoint_id: checkpointId },
          });
          if (options.filter && !Object.entries(options.filter).every(([key, value]) => tuple.metadata?.[key] === value)) {
            continue;
          }
          yield tuple;
          if (limit !== undefined) {
            limit -= 1;
            if (limit <= 0) return;
          }
        }
      }
    }
  }

  async put(config, checkpoint, metadata) {
    const threadId = config.configurable?.thread_id;
    const namespace = config.configurable?.checkpoint_ns ?? "";
    if (threadId === undefined) throw new Error("JsonFileCheckpointSaver requires configurable.thread_id");
    const preparedCheckpoint = copyCheckpoint(checkpoint);
    const serializedCheckpoint = await this.encode(preparedCheckpoint);
    const serializedMetadata = await this.encode(metadata);
    await this.updateStore(async (store) => {
      store.storage[threadId] ||= {};
      store.storage[threadId][namespace] ||= {};
      store.storage[threadId][namespace][checkpoint.id] = {
        checkpoint: serializedCheckpoint,
        metadata: serializedMetadata,
        parentCheckpointId: config.configurable?.checkpoint_id,
      };
    });
    return { configurable: { thread_id: threadId, checkpoint_ns: namespace, checkpoint_id: checkpoint.id } };
  }

  async putWrites(config, writes, taskId) {
    const threadId = config.configurable?.thread_id;
    const namespace = config.configurable?.checkpoint_ns ?? "";
    const checkpointId = config.configurable?.checkpoint_id;
    if (threadId === undefined || checkpointId === undefined) {
      throw new Error("JsonFileCheckpointSaver requires thread_id and checkpoint_id for writes");
    }
    const serializedWrites = await Promise.all(
      writes.map(async ([channel, value], index) => ({
        channel,
        value: await this.encode(value),
        index: WRITES_IDX_MAP[channel] ?? index,
      })),
    );
    await this.updateStore(async (store) => {
      const key = checkpointKey(threadId, namespace, checkpointId);
      store.writes[key] ||= {};
      for (const write of serializedWrites) {
        const innerKey = `${taskId},${write.index}`;
        if (write.index >= 0 && store.writes[key][innerKey]) continue;
        store.writes[key][innerKey] = [taskId, write.channel, write.value];
      }
    });
  }

  async deleteThread(threadId) {
    await this.updateStore(async (store) => {
      delete store.storage[threadId];
      for (const key of Object.keys(store.writes)) {
        if (JSON.parse(key)[0] === threadId) delete store.writes[key];
      }
    });
  }
}
