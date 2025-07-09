export function createInputBar() {
  const inputBarTemplate = `
    <div class="input-bar flex-row">
      <div class="flex-column">
        <label>일자</label>
        <input type="date" id="dateInput" />
      </div>
      <div class="flex-column">
        <label>금액</label>
        <div class="flex-row">
          <button id="amountToggle">+</button>
          <input type="number" id="amountInput" placeholder="금액을 입력하세요" />
        </div>
      </div>
      <div class="flex-column">
        <label>내용</label>
        <input
          type="text"
          id="contentInput"
          maxlength="32"
          placeholder="내용을 입력하세요"
        />
      </div>
      <div class="flex-column">
        <label>결제수단</label>
        <select
          name="paymentMethod"
          id="paymentMethod"
        >
          <option value="cash">현금</option>
          <option value="card">카드</option>
          <option value="add">추가하기</option>
        </select>
      </div>
      <div class="flex-column">
        <label>분류</label>
        <select
          name="category"
          id="category"
        >
          <option value="life">생활</option>
          <option value="food">식비</option>
          <option value="transportation">교통</option>
          <option value="shopping">쇼핑/뷰티</option>
          <option value="health">의료/건강</option>
          <option value="entertainment">문화/여가</option>
          <option value="etc">미분류</option>
        </select>
      </div>
      <div class="flex-column">
        <button id="addButton" class="add-button">추가</button>
      </div>
    </div>
  `;

  return inputBarTemplate;
}
export function renderInputBar(container) {
  container.innerHTML = createInputBar();
}
