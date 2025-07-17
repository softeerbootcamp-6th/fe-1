// 공통 Store 클래스(Observer 패턴 사용)
class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.observers = [];
  }

  // 상태 가져오기
  getState() {
    return { ...this.state };
  }

  // 상태 설정하기
  setState(newState) {
    const oldState = { ...this.state };
    this.state = { ...this.state, ...newState };
    this.notify(oldState, this.state);
  }

  // 옵저버 추가
  subscribe(callback) {
    this.observers.push(callback);

    // 구독 해제 함수 반환
    return () => {
      const index = this.observers.indexOf(callback);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  // 옵저버들에게 알림
  notify(oldState, newState) {
    this.observers.forEach((callback) => {
      callback(newState, oldState);
    });
    // console.log("notify 호출", newState, oldState);
  }
}

export { Store };
