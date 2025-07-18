// 전역 이벤트 버스
class EventBus {
    constructor() {
        this.events = {};
    }

    // 이벤트 리스너 등록
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event] = [callback]
        
    }

    // 이벤트 리스너 제거
    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }

    // 이벤트 발생
    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach((callback) => callback(data));
        console.log('current events:', this.events);
    }
}

export const eventBus = new EventBus();
