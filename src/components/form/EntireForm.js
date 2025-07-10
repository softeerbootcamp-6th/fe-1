export const EntireForm = () => {
  const entireForm = document.createElement("div");
  entireForm.classList.add("entire-form");
  entireForm.innerHTML = `
    <div class="form-date">
      <label for="input" class="light-12">일자</label>
      <input type="date" name="date">
    </div>
    <div class="split"></div>
    <div class="form-money">
      <label for="input" class="light-12">금액</label>
      <div>
        <img width="16px" src="./src/assets/minus.png" alt="minus icon">
        <input type="text" name="money">
        <span>원</span>
      </div>
    </div>
    <div class="split"></div>
    <div class="form-content">
      <div class="content-length light-12">0/32</div>
      <label for="input" class="light-12">내용</label>
      <input type="text" id="input" name="input" placeholder="입력하세요">
    </div>
    <div class="split"></div>
    <div class="form-payment">
      <label for="input" class="light-12">결제수단</label>
      <input type="text" id="input" name="input">
    </div>
    <div class="split"></div>
    <div class="form-category">
      <label for="input" class="light-12">카테고리</label>
      <input type="text" id="input" name="input">
    </div>
    <div class="form-header">
      <img style="width:40px" src="./src/assets/check.png" alt="check icon">
    </div>
  `;
  return entireForm;
};
