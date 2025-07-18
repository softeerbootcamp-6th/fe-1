// 가계부 내역의 추가 / 수정 / 삭제를 담당하는 파일
import {
  addRecordsToServer,
  deleteRecordsFromServer,
  updateRecordInServer,
} from "../api/recordsApi.js";
import { validateForm, disableSubmitButton, initCategoryDropdown } from "../form/formUtils.js";
import { recordStore } from "../../store/recordStore.js";
import { formState } from "../state/formState.js";
import { elements } from "../elements.js";

// 날짜 변경에 따라 수정 방식을 다르게 호출하는 함수
export async function handleRecordUpdate({ oldDateId, newDate, itemId, updatedItem }) {
  const record = recordStore
    .getRecords()
    .find((record) => record.id.toString() === oldDateId.toString());

  if (!record) return;

  const oldDate = record.date;

  if (oldDate === newDate) {
    // 날짜 수정 없는 경우: 그냥 update 호출
    updateRecordInServer({
      dateId: oldDateId,
      itemId,
      updatedItem,
    }).then(() => {
      recordStore.updateRecordInStore({
        dateId: oldDateId,
        itemId,
        updatedItem,
      });
    });
  } else {
    // 날짜가 바뀌는 경우: 기존 아이템 삭제 후 새로운 날짜 아이템 배열에 추가
    deleteRecordsFromServer(oldDateId, itemId).then(() => {
      recordStore.deleteRecordFromStore(oldDateId, itemId);
    });

    // 새로운 날짜가 record에 이미 있는지에 따라 새로운 id 생성 여부 결정
    const newRecordId =
      recordStore.getRecords().find((r) => r.date === newDate)?.id || Date.now().toString();

    const newRecord = {
      recordId: newRecordId,
      date: newDate,
      item: { ...updatedItem, id: itemId },
    };

    addRecordsToServer(newRecord).then(() => {
      recordStore.addRecordToStore(newRecord);
    });
  }
}

// 폼 제출 버튼 클릭시 현재 입력값을 가져와서 추가 | 수정 하는 함수
export const initFormSubmitEvent = () => {
  const submitButtonEl = elements.submitButtonEl();
  submitButtonEl.addEventListener("click", (event) => {
    event.preventDefault();
    const date = elements.dateInputEl().value;
    const sign = elements.toggleButtonEl().textContent.trim();
    const value = elements.valueInputEl().value;
    const description = elements.descInputEl().value;
    const payment = elements.paymentCellEl().textContent.trim();
    const category = elements.categoryCellEl().textContent.trim();
    const amount = sign + value;

    // 추가해야하는 상황이라면 id 생성해서 추가
    const itemId = formState.isEditMode
      ? formState.editingItem.itemId
      : Date.now().toString() + Math.random().toString().slice(2, 5);
    const recordId = formState.isEditMode ? formState.editingItem.dateId : Date.now().toString();

    const formInput = {
      recordId,
      date,
      item: {
        id: itemId,
        category,
        description,
        payment,
        amount,
      },
    };

    if (formState.isEditMode) {
      // 수정
      handleRecordUpdate({
        oldDateId: formState.editingItem.dateId,
        newDate: date,
        itemId: itemId,
        updatedItem: formInput.item,
      }).then(() => {
        resetForm();
        formState.cancelEdit();
      });
    } else {
      // 추가
      addRecordsToServer(formInput).then(() => {
        recordStore.addRecordToStore(formInput);
        resetForm();
      });
    }
  });
};

export function initModifyEvent() {
  const recordContainerEl = elements.recordContainerEl();

  recordContainerEl.addEventListener("click", (e) => {
    const recordItemEl = e.target.closest(".record-item");
    if (!recordItemEl) return;

    const dateId = recordItemEl.closest(".record-container").getAttribute("date-id");
    const itemId = recordItemEl.getAttribute("item-id");

    const prevSelected = recordContainerEl.querySelector(".record-item.selected");

    if (
      formState.isEditMode &&
      formState.editingItem?.dateId === dateId &&
      formState.editingItem?.itemId === itemId
    ) {
      recordItemEl.classList.remove("selected");
      resetForm();
      formState.cancelEdit();
      return;
    }

    if (prevSelected) {
      prevSelected.classList.remove("selected");
    }

    recordItemEl.classList.add("selected");
    formState.startEdit({ dateId, itemId });

    const record = recordStore.getRecords().find((r) => r.id.toString() === dateId.toString());
    const item = record.items.find((r) => r.id.toString() === itemId.toString());

    const amount = item.amount;
    const sign = amount < 0 ? "-" : "+";
    const value = Math.abs(amount);

    elements.dateInputEl().value = record.date;
    elements.toggleButtonEl().textContent = sign;
    elements.valueInputEl().value = value;
    elements.descInputEl().value = item.description;
    elements.paymentCellEl().textContent = item.payment;
    elements.categoryCellEl().textContent = item.category;
    validateForm();
  });
}

function resetForm() {
  elements.dateInputEl().value = "";
  elements.toggleButtonEl().textContent = "-";
  formState.valueSign = "minus";
  elements.valueInputEl().value = "";
  elements.descInputEl().value = "";
  elements.paymentCellEl().textContent = "선택하세요";
  elements.categoryCellEl().textContent = "선택하세요";
  disableSubmitButton();
  initCategoryDropdown();
}

// 삭제 이벤트 등록 함수
export function initDeleteEvent() {
  const recordContainerEl = elements.recordContainerEl();

  recordContainerEl.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".delete");
    if (!deleteBtn) return;
    const dateId = e.target.closest(".record-container").getAttribute("date-id");
    const itemId = e.target.closest(".record-item").getAttribute("item-id");

    deleteRecordsFromServer(dateId, itemId).then(() => {
      recordStore.deleteRecordFromStore(dateId, itemId);
    });
  });
}
