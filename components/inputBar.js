export function createInputBar() {
  return `
    <form class="input-bar flex-row" id="inputBarForm">
      <div class="flex-column">
        <label>일자</label>
        <input type="date" name="date" required />
      </div>
      <div class="flex-column">
        <label>금액</label>
        <div class="flex-row">
          <button type="button" id="amountToggle">+</button>
          <input type="number" name="amount" placeholder="금액을 입력하세요" required />
        </div>
      </div>
      <div class="flex-column">
        <label>내용</label>
        <input
          type="text"
          name="content"
          maxlength="32"
          placeholder="내용을 입력하세요"
          required
        />
      </div>
      <div class="flex-column">
        <label>결제수단</label>
        <select name="paymentMethod" required>
          <option value="cash">현금</option>
          <option value="card">카드</option>
          <option value="add">추가하기</option>
        </select>
      </div>
      <div class="flex-column">
        <label>분류</label>
        <select name="category" required>
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
        <button type="submit" class="add-button">추가</button>
      </div>
    </form>
  `;
}

export function renderInputBar(container) {
  container.innerHTML = createInputBar();

  const form = container.querySelector("#inputBarForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // 페이지 새로고침 방지

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log("Object로 바꾼 Form Data:", data);
    console.log("Form Data:", formData);
    /*
      예시 출력:
      {
        date: '2025-07-10',
        amount: '10000',
        content: '점심',
        paymentMethod: 'card',
        category: 'food'
      }
    */
  });
}
