const STALE_TIME = 1000 * 60; // 1분

class CacheManager {
  #cache = new Map();

  set(dataType, data) {
    this.#cache.set(dataType, { data, fetchedAt: Date.now() });
  }

  get(dataType) {
    return this.#cache.get(dataType);
  }

  isFresh(dataType) {
    const entry = this.#cache.get(dataType);
    if (!entry) return false;
    return Date.now() - entry.fetchedAt < STALE_TIME;
  }

  invalidate(dataType) {
    this.#cache.delete(dataType);
  }

  fetch({ key, fetchFn = () => Promise.resolve([]), onSuccess = () => {} }) {
    if (this.isFresh(key)) {
      const { data } = this.get(key);
      onSuccess(data); // 캐시에서 가져옴
    } else {
      fetchFn()
        .then((serverData) => {
          this.set(key, serverData); // 캐시 설정
          onSuccess(serverData); // 서버에서 가져옴
        })
        .catch(onError);
    }
  }
}

export const cacheManager = new CacheManager();
