// 폼 관련 상태를 관리하는 모듈
export const formState = {
  valueSign: "minus",
  isEditMode: false,
  editingItem: null,

  startEdit(item) {
    this.isEditMode = true;
    this.editingItem = item;
  },
  cancelEdit() {
    this.isEditMode = false;
    this.editingItem = null;
  },
};
