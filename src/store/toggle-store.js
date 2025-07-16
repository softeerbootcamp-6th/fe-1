import { Store } from "./store.js";

// 토글 상태를 관리하는 Store 인스턴스
export const toggleStore = new Store({
  currentToggleType: "minus", // 기본값은 minus
});

// 토글 관련 유틸리티 함수들
export const toggleUtils = {
  // 현재 토글 타입 가져오기
  getCurrentToggleType() {
    return toggleStore.getState().currentToggleType;
  },

  // 토글 타입 설정
  setToggleType(type) {
    if (type === "plus" || type === "minus") {
      toggleStore.setState({ currentToggleType: type });
    }
  },

  // 토글 타입 토글 (plus ↔ minus)
  toggleType() {
    const currentType = toggleStore.getState().currentToggleType;
    const newType = currentType === "plus" ? "minus" : "plus";
    toggleStore.setState({ currentToggleType: newType });
  },

  // plus로 설정
  setPlus() {
    toggleStore.setState({ currentToggleType: "plus" });
  },

  // minus로 설정
  setMinus() {
    toggleStore.setState({ currentToggleType: "minus" });
  },

  // 현재 타입이 plus인지 확인
  isPlus() {
    return toggleStore.getState().currentToggleType === "plus";
  },

  // 현재 타입이 minus인지 확인
  isMinus() {
    return toggleStore.getState().currentToggleType === "minus";
  },

  // 토글 타입에 따른 부호 반환
  getSign() {
    return toggleStore.getState().currentToggleType === "plus" ? "+" : "-";
  },

  // 토글 타입에 따른 수익/지출 여부 반환
  isIncome() {
    return toggleStore.getState().currentToggleType === "plus";
  },

  // 토글 타입에 따른 지출 여부 반환
  isExpense() {
    return toggleStore.getState().currentToggleType === "minus";
  },
};
