import {
  INCOME_CATEGORIES,
  EXPENSE_CATEGORIES,
} from "../../constants/category.js";

export function createCategoryOptions(isIncome) {
  const categories = isIncome ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return [
    `<option value="" disabled selected hidden>선택하세요</option>`,
    ...categories.map((cat) => `<option value="${cat}">${cat}</option>`),
  ].reduce((acc, cur) => acc + cur, "");
}

export function createInputBar(today) {
  return `
  <form class="input-bar flex-row" id="inputBarForm">
    <label class="flex-column input-section">
      <div class="input-label light-12">일자</div>
      <input type="date" name="date" class="date-input semibold-12" required value="${today}" />
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">금액</div>
      <div class="flex-row semibold-12">
        <button type="button" class="amount-toggle" data-sign="+">
          <img src="../icons/plus.svg" alt="plus" />
        </button>
        <input type="number" name="amount" placeholder="0" min="0" required class="semibold-12 text-input" />
        <div class="semibold-12">원</div>
      </div>
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">내용</div>
      <input type="text" name="description" maxlength="32" placeholder="내용을 입력하세요" required class="semibold-12 text-input" />
    </label>
    <label class="flex-column input-section">
      <div class="input-label light-12">결제수단</div>
      <select name="paymentMethod" required class="semibold-12 text-input">
        <option value="" disabled selected hidden>선택하세요</option>
        <option value="현금">현금</option>
        <option value="카드">카드</option>
        <option value="추가하기">추가하기</option>
      </select>
    </label>
    <label class="flex-column w-full px-20">
      <div class="input-label light-12">분류</div>
      <select name="category" required class="semibold-12 text-input">
        <option value="" disabled selected hidden>선택하세요</option>
        <option value="생활">생활</option>
        <option value="식비">식비</option>
        <option value="교통">교통</option>
        <option value="쇼핑/뷰티">쇼핑/뷰티</option>
        <option value="의료/건강">의료/건강</option>
        <option value="문화/여가">문화/여가</option>
        <option value="미분류">미분류</option>
      </select>
    </label>
    <div class="flex-column">
      <button type="submit" class="add-button" id="submitButton">
        <img src="../icons/check.svg" alt="check" />
      </button>
    </div>
  </form>
  `;
}
