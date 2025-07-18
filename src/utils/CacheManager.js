import { ListApi } from "../api/ListApi.js";
import { listStore } from "../store/ListStore.js";

export const cache = new Map();

export const CacheManager = {
  setCache: (dataType, data) => {
    cache.set(dataType, { data, fetchedAt: Date.now() });
  },
  invalidateCache: (dataType) => {
    cache.delete(dataType);
  },
  fetchFromServer: (dataType, callback) => {
    const STALE_TIME = 1000 * 60; // 1분
    const cacheEntry = cache.get(dataType);
    if (cacheEntry && Date.now() - cacheEntry.fetchedAt < STALE_TIME) {
      //import from cache
      listStore.dispatch("initListItem", cacheEntry.data);
    } else {
      //fetch from server
      ListApi.getList().then((data) => {
        listStore.dispatch("initListItem", [...data]);
      });
    }
  },
};
