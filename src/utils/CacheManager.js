import { ListApi } from "../api/ListApi.js";
import { listStore } from "../store/ListStore.js";

const STALE_TIME = 1000 * 60; // 1분
export const cache = new Map();

export const CacheManager = {
  setCache: (dataType, data) => {
    cache.set(dataType, { data, fetchedAt: Date.now() });
  },
  invalidateCache: (dataType) => {
    cache.delete(dataType);
  },
  //캐시 사용 여부 판단 -> 가능(사용), 불가능(서버에서 fetch)
  fetchFromServer: (dataType, callback) => {
    const cacheEntry = cache.get(dataType);
    if (cacheEntry && Date.now() - cacheEntry.fetchedAt < STALE_TIME) {
      //import from cache
      listStore.dispatch("initListItem", cacheEntry.data);
    } else {
      //fetch from server
      ListApi.getList().then((data) => {
        listStore.dispatch("initListItem", [...data]);
        CacheManager.setCache(dataType, data);
      });
    }
  },
};
