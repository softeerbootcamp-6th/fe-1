import { getMonthData } from "../api/api.js"

class DataStore {
    constructor() {
        this.cache = new Map();
        this.currentData = []
        this.listeners = []
    }
    async loadData(year, month){
        const cacheKey = `${year}-${month}`;
        if(this.cache.has(cacheKey)){
            this.currentData = this.cache.get(cacheKey);
            this.notifyListeners();
            return this.currentData;
        }
        try{
            const data = await getMonthData(year, month);
            this.cache.set(cacheKey, data);
            this.currentData = data;
            this.notifyListeners();
            return data;
        } catch (error) {
            console.error("데이터 없음", error);
            this.currentData = [];
            this.notifyListeners();
            return [];
        }
    }
    invalidateCache(year, month){
        const cacheKey = `${year}-${month}`;
        this.cache.delete(cacheKey)
    }
    subscribe(callback){
        this.listeners.push(callback);
    }
    unsubscribe(callback){
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }
    notifyListeners(){
        this.listeners.forEach(listener => listener(this.currentData));
    }
}
export const dataStore = new DataStore();