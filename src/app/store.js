// 액션 타입별 핸들러 함수를 정의
const actionHandlers = {
  'ENTRY/ADD': (state, payload) => {
    const entry = { ...payload };
    return { ...state, entries: [...state.entries, entry] };
  },

  'ENTRY/REMOVE': (state, payload) => {
    return {
      ...state,
      entries: state.entries.filter((e) => e.id !== payload.id),
    };
  },

  'ENTRY/UPDATE': (state, payload) => {
    const updatedEntries = state.entries.map((entry) => {
      if (entry.id !== payload.id) return entry;
      return JSON.parse(JSON.stringify(payload));
    });
    return { ...state, entries: updatedEntries };
  },

  'ENTRY/SELECT': (state, payload) => {
    const entry = { ...payload };
    return { ...state, selectedEntry: entry };
  },

  'ENTRY/SELECT/CLEAR': (state) => {
    return { ...state, selectedEntry: null };
  },

  'DATE/SET': (state, payload) => {
    return { ...state, year: payload.year, month: payload.month };
  },
};

export class Store {
  // constructor를 통해 초기 상태를 설정
  constructor(initialState) {
    // 초기 상태를 저장
    this.state = initialState;
    // 구독자들을 저장할 Set
    this.listeners = new Set();
  }

  // 현재 상태를 반환하는 함수
  getState = () => this.state;
  // 구독 함수(함수를 인자로 받아 상태 변경 시 호출)
  subscribe = (fn) => {
    this.listeners.add(fn);
    // 구독 해제 함수 반환
    // 이 함수를 호출하면 해당 함수가 구독자 목록에서 제거됨
    return () => this.listeners.delete(fn);
  };
  // 상태를 변경하는 함수
  dispatch = (type, payload) => {
    const handler = actionHandlers[type];

    handler
      ? (this.state = handler(this.state, payload))
      : console.warn('[Store] Unknown action:', type);

    // 상태가 변경되면 인자로 받았던 함수들을 호출
    this.listeners.forEach((fn) => fn(this.state));
  };
}
