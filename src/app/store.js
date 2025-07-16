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
        switch (type) {
            // store에 새로운 엔트리를 추가하는 액션
            case 'ENTRY/ADD': {
                // payload에 있는 데이터를 기반으로 새로운 엔트리를 생성, ...payload를 통해 얕은 복사를 수행해서 새 객체를 생성
                const entry = {...payload};
                // 현재 상태의 entries 배열에 새 엔트리를 추가
                this.state = {...this.state, entries: [...this.state.entries, entry]};
                break;
            }
            // store에서 엔트리를 삭제하는 액션
            case 'ENTRY/REMOVE':
                // payload에 있는 id를 가진 엔트리를 찾아서 삭제
                this.state = {...this.state, entries: this.state.entries.filter(e => e.id !== payload.id)};
                break;

            // store에서 엔트리를 업데이트하는 액션
            case 'ENTRY/UPDATE': {
                // 깊은 복사를 사용한 항목 업데이트
                const updatedEntries = this.state.entries.map(entry => {
                    if (entry.id !== payload.id) return entry;
                    // JSON 직렬화/역직렬화를 통한 깊은 복사
                    return JSON.parse(JSON.stringify(payload));
                });

                // 상태 업데이트
                this.state = {...this.state, entries: updatedEntries};
                break;
            }

            // store에서 엔트리를 선택하는 액션
            case 'ENTRY/SELECT':
                const entry = {...payload};
                // 선택된 엔트리를 상태에 저장
                this.state = {...this.state, selectedEntry: entry};
                break;

            // store에서 선택된 엔트리를 초기화하는 액션
            case 'ENTRY/SELECT/CLEAR':
                // 선택된 엔트리를 null로 초기화
                this.state = {...this.state, selectedEntry: null};
                break;

            // store의 날짜를 변경하는 액션
            case 'DATE/SET':
                // payload에 있는 연도와 월을 기반으로 상태를 업데이트
                this.state = {...this.state, year: payload.year, month: payload.month};
                break;

            default:
                console.warn('[Store] Unknown action:', type);
        }
        // 상태가 변경되면 인자로 받았던 함수들을 호출
        this.listeners.forEach(fn => fn(this.state));
    };
}