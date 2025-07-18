//js/input-form.js
import { renderCategoryOptions } from "../../../../components/inputForm/inputFormItems/categoryRender.js";
import { loadDummyEntries } from "../../../../js/core.js";
import { store } from "../../../../store/store.js";

/* 
initRenderDummyData()
현재 월과 년도를 통해 loadDummyEntries에서 더미데이터를 state.js의 entires에 저장하고
카테고리 옵션을 렌더링하는 함수 

생각해보면 카테고리 렌더링 기능이 여기 왜 있을까 의문이 든다. 
수정 필요!!!!!


*/
export function initRenderDummyData() {
  const { currentMonth, currentYear } = store.getState();
  const currentDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;
  loadDummyEntries(currentDate);
  renderCategoryOptions();
}
