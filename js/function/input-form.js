//js/input-form.js
import { updateTotalAmounts } from "./totalAmount.js";
import { sharedState } from "../state/state.js";
import { renderCategoryOptions } from "./categoryRender.js";
import { saveEntriesToServer, loadEntriesFromServer } from "../api/api.js";
import { currentMonth, currentYear } from "./header.js";
import { getDateFromServer } from "./entry.js";

export function initInputForm() {
  let selectedMethod = sharedState.selectedMethod; // sharedState에서 selectedMethod 요소를 가져옴
  let selectedCategory = sharedState.selectedCategory; // sharedState에서 selectedCategory 요소를 가져옴
  let isIncome = sharedState.isIncome; // 수입/지출 여부를 sharedState에서 가져옴

  const addBtn = document.getElementById("add-btn");

  const display = document.getElementById("dropdown-display");
  const categoryDisplay = document.getElementById("category-display");

  const entries = sharedState.entries; // 서버에서 가져온 항목들을 저장할 배열

  // function addEntryToDOM(entry) {
  //   const entryList = document.getElementById("entry-list");

  //   const dateObj = new Date(entry.date);
  //   const month = dateObj.getMonth() + 1;
  //   const day = dateObj.getDate();
  //   const weekday = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
  //   const dateLabel = `${month}월 ${day}일 ${weekday}요일`;

  //   let dateSection = entryList.querySelector(`[data-date="${entry.date}"]`);
  //   if (!dateSection) {
  //     dateSection = document.createElement("div");
  //     dateSection.className = "entry-date-section";
  //     dateSection.setAttribute("data-date", entry.date);
  //     dateSection.innerHTML = `
  //       <div class="entry-sort">
  //         <div>${dateLabel}</div>
  //         <div class="entry-amount-section">
  //           <div>수입</div>
  //           ${entry.amount}
  //           <div>지출</div>
  //           ${entry.amount}
  //         </div>
  //       </div>
  //       <div class="entry-items"></div>
  //     `;
  //     entryList.insertBefore(dateSection, entryList.firstChild);
  //   }

  //   const entryItems = dateSection.querySelector(".entry-items");
  //   const item = document.createElement("div");
  //   item.className = "entry-row";
    
  //   // 수입이면 + 기호, 지출이면 - 기호 표시
  //   const sign = entry.isIncome ? '' : '-';
  //   const amountClass = entry.isIncome ? 'income-amount' : 'expense-amount';

  //   const category = {
  //     "생활": "--colorchip-90",
  //     "식비": "--colorchip-60",
  //     "교통": "--colorchip-70",
  //     "쇼핑/뷰티": "--colorchip-30",
  //     "의료/건강": "--colorchip-50",
  //     "문화/여가": "--colorchip-100",
  //     미분류: "--colorchip-110",
  //     월급: "--colorchip-20",
  //     용돈: "--colorchip-40",
  //     기타수입: "--colorchip-10"
  //   }

  //   item.setAttribute("data-id", entry.id);
    
  //   item.innerHTML = `
  //     <div class="entry-category ${category[entry.category]}">${entry.category}</div>
  //     <div class="entry-desc">${entry.desc}</div>
  //     <div class="entry-method">${entry.method}</div>
  //     <div class="entry-amount ${amountClass}">${sign}${entry.amount.toLocaleString()}원</div>
  //     <div class="delete-btn">
  //       <div class="delete-icon-wrapper">
  //       <img src="../../assets/icons/delete-botton.svg" alt="삭제" class="delete-icon"></img>
  //       삭제
  //       </div>
  //     </div>
  //   `;
  //   entryItems.appendChild(item);
  // }

  addBtn.addEventListener("click", () => {
    const date = document.getElementById("date").value;
    const rawAmount = document.getElementById("amount").value.replace(/,/g, "");
    const amount = Number(rawAmount);
    const desc = document.getElementById("desc").value;
    isIncome = sharedState.isIncome; // 수입/지출 여부를 sharedState에서 가져옴
    selectedCategory = sharedState.selectedCategory; // sharedState에서 selectedCategory 요소를 가져옴
    selectedMethod = sharedState.selectedMethod; // sharedState에서 selectedMethod 요소를 가져옴
    //date에서 연도와 월을 가져와서 현재 월과 연도와 비교하는 로직만들어줘
    // 현재 월과 연도를 비교하여 입력된 날짜가 현재 월인지 확인
    if (!date || !amount || !desc) {
      alert("모든 항목을 정확히 입력해주세요!");
      return;
    }

    const entry = { 
      date, 
      amount, 
      desc, 
      method: selectedMethod, 
      category: selectedCategory,
      isIncome: isIncome // 수입/지출 여부 저장
    };
    entries.push(entry);
    addEntryToDOM(entry);
    updateTotalAmounts();

    document.getElementById("date").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("desc").value = "";
    document.getElementById("amount").placeholder = "0";
    selectedMethod = null;
    selectedCategory = null;
    display.textContent = "선택하세요";
    categoryDisplay.textContent = "선택하세요";

  });


  // 초기 더미 데이터 로드
  async function loadDummyEntries(currentDate) {
    const entriesFromServer = await loadEntriesFromServer(currentDate);
    
    if (!Array.isArray(entriesFromServer)) {
      console.log("No entries found for the current date.");
      return;
    }
    entriesFromServer.forEach(entry => {
      getDateFromServer(entry);
      sharedState.entries.push(entry);
    });
    updateTotalAmounts();
  }
  const currentDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
  loadDummyEntries(currentDate);



  renderCategoryOptions();
}




//// 항목을 DOM에 추가하는 함수
export async function addEntryToDOM(entry) {
    const entryList = document.getElementById("entry-list");

    const dateObj = new Date(entry.date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
    const dateLabel = `${month}월 ${day}일 ${weekday}요일`;

    if(dateObj.getFullYear() !== currentYear || dateObj.getMonth() + 1 !== currentMonth) {
      const yearMonth = dateObj.getFullYear() + '-' + String(dateObj.getMonth() + 1).padStart(2, '0');
      saveEntriesToServer(yearMonth, entry);
      return;
    }

    let dateSection = entryList.querySelector(`[data-date="${entry.date}"]`);
    if (!dateSection) {
      dateSection = document.createElement("div");
      dateSection.className = "entry-date-section";
      dateSection.setAttribute("data-date", entry.date);
      dateSection.innerHTML = `
        <div class="entry-sort">
          <div>${dateLabel}</div>
          <div class="entry-amount-section">
            <div>수입</div>
            ${entry.amount}
            <div>지출</div>
            ${entry.amount}
          </div>
        </div>
        <div class="entry-items"></div>
      `;
      entryList.insertBefore(dateSection, entryList.firstChild);
    }

    const entryItems = dateSection.querySelector(".entry-items");
    const item = document.createElement("div");
    item.className = "entry-row";
    
    // 수입이면 + 기호, 지출이면 - 기호 표시
    const sign = entry.isIncome ? '' : '-';
    const amountClass = entry.isIncome ? 'income-amount' : 'expense-amount';

    const category = {
      "생활": "--colorchip-90",
      "식비": "--colorchip-60",
      "교통": "--colorchip-70",
      "쇼핑/뷰티": "--colorchip-30",
      "의료/건강": "--colorchip-50",
      "문화/여가": "--colorchip-100",
      미분류: "--colorchip-110",
      월급: "--colorchip-20",
      용돈: "--colorchip-40",
      기타수입: "--colorchip-10"
    }

    item.setAttribute("data-id", entry.id);
    
    item.innerHTML = `
      <div class="entry-category ${category[entry.category]}">${entry.category}</div>
      <div class="entry-desc">${entry.desc}</div>
      <div class="entry-method">${entry.method}</div>
      <div class="entry-amount ${amountClass}">${sign}${entry.amount.toLocaleString()}원</div>
      <div class="delete-btn">
        <div class="delete-icon-wrapper">
        <img src="../../assets/icons/delete-botton.svg" alt="삭제" class="delete-icon"></img>
        삭제
        </div>
      </div>
    `;
    entryItems.appendChild(item);
    const yearMonth = dateObj.getFullYear() + '-' + String(dateObj.getMonth() + 1).padStart(2, '0');
    saveEntriesToServer(yearMonth, entry);

  }