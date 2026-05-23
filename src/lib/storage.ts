import { createJSONStorage, type StateStorage } from "zustand/middleware";

const memoryStore = new Map<string, string>();

const fallbackStorage: StateStorage = {
  getItem: (name) => memoryStore.get(name) ?? null,
  setItem: (name, value) => {
    memoryStore.set(name, value);
  },
  removeItem: (name) => {
    memoryStore.delete(name);
  },
};

export const safeJsonStorage = createJSONStorage(() => {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage;
    }
  } catch {
    return fallbackStorage;
  }

  return fallbackStorage;
});
