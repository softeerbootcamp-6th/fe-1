import { Store } from "./store.js";

// 편집 모드 상태를 관리하는 Store 인스턴스
export const editStore = new Store({
  isEditMode: false,
  editingItemId: null,
});

// 편집 모드 관련 유틸리티 함수들
export const editUtils = {
  // 편집 모드 상태 가져오기
  getEditMode() {
    return editStore.getState().isEditMode;
  },

  // 편집 모드 토글
  toggleEditMode() {
    const currentState = editStore.getState();
    editStore.setState({ isEditMode: !currentState.isEditMode });
  },

  // 편집 모드 활성화
  enableEditMode() {
    editStore.setState({ isEditMode: true });
  },

  // 편집 모드 비활성화
  disableEditMode() {
    editStore.setState({ isEditMode: false });
  },

  // 편집 모드 상태 확인
  isEditMode() {
    return editStore.getState().isEditMode;
  },

  // 편집 모드가 아닌지 확인
  isNotEditMode() {
    return !editStore.getState().isEditMode;
  },
};
