export const EntireForm = () => {
  const entireForm = document.createElement("div");
  entireForm.classList.add("entire-form");
  const input = {
    date: new Date("2023-08-01"),
    money: "",
    content: "",
    payment: "",
    category: "",
  };

  entireForm.innerHTML = `
    <div class="form-date">
      <label for="date" class="light-12">일자</label>
      <input type="date" id="date" name="date" value="${
        input.date.toISOString().split("T")[0]
      }">
    </div>
    <div class="split"></div>
    <div class="form-money">
      <label for="money" class="light-12">금액</label>
      <div>
        <img width="16px" src="./src/assets/minus.png" alt="minus icon">
        <input type="text" id="money" name="money" value="${input.money}">
        <span>원</span>
      </div>
    </div>
    <div class="split"></div>
    <div class="form-content">
      <div class="content-length light-12">0/32</div>
      <label for="content" class="light-12">내용</label>
      <input type="text" id="content" name="content" placeholder="입력하세요" maxlength="32" value="${
        input.content
      }">
    </div>
    <div class="split"></div>
    <div class="form-payment">
      <label for="payment" class="light-12">결제수단</label>
      <input type="text" id="payment" name="payment">
    </div>
    <div class="split"></div>
    <div class="form-category">
      <label for="category" class="light-12">카테고리</label>
      <input type="text" id="category" name="category">
    </div>
    <div class="form-checker">
      <img style="width:40px" src="./src/assets/check.png" alt="check icon">
    </div>
  `;

  entireForm.addEventListener("input", (e) => {
    const target = e.target;
    if (!target.name) return;
    if (target.name === "date") {
      input.date = new Date(target.value);
    } else {
      input[target.name] = target.value;
    }
  });

  const formChecker = entireForm.querySelector(".form-checker");
  formChecker.addEventListener("click", () => {
    console.log("입력값:", input);
  });
  return entireForm;
};
