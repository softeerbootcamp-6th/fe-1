import { deleteEntry } from "../api/api.js";
import { sharedState } from "../state/state.js";
import { renderCategoryOptions } from "./categoryRender.js";

export function deleteEntries() {

    //이벤트 위임 방식
  document.getElementById("entry-list").addEventListener("click", (e) => {
    // 삭제 버튼 또는 내부 요소 클릭 시
    const deleteBtn = e.target.closest(".delete-btn");
    if (!deleteBtn) {
        //수정
        const entryRow = e.target.closest(".entry-row");
        
        if(!entryRow) return;
        const id = Number(entryRow.dataset.id);
        const entry = sharedState.entries.find(entry => entry.id === id);


        const toggleSign = document.getElementById("toggle-sign");
        if (entry.isIncome) {
            toggleSign.textContent = "+";
            toggleSign.classList.toggle("minus", !entry.isIncome);
            sharedState.isIncome = true;
            renderCategoryOptions();
            
        } else {
            toggleSign.textContent = "-";
            toggleSign.classList.toggle("minus", !entry.isIncome);
            sharedState.isIncome = false;
            renderCategoryOptions();
        }

        // 결제수단 표시
        document.getElementById("dropdown-display").textContent = entry.method;
        sharedState.selectedMethod = entry.method;

        // 카테고리 표시
        document.getElementById("category-display").textContent = entry.category;
        sharedState.selectedCategory = entry.category;

        document.getElementById("date").value = entry.date;
        document.getElementById("amount").value = entry.amount.toLocaleString();
        document.getElementById("desc").value = entry.desc;

        sharedState.entryId = entry.id; // sharedState에 entryId 저장
        
        return;
    }

    const entrySection = deleteBtn.closest(".entry-date-section");
    if (!entrySection) return;

    // 가장 가까운 entry-row 찾기
    const entryRow = deleteBtn.closest(".entry-row");
    const id = entryRow.dataset.id;

    if (!id) return;


    const deleteModal = document.querySelector(".delete-modal");
    deleteModal.classList.remove("delete-hidden");

    const confirmDeleteBtn = document.querySelector(".confirm-delete");
    const cancelDeleteBtn = document.querySelector(".cancel-delete");
    confirmDeleteBtn.addEventListener("click", () => {
      // 삭제 확인 버튼 클릭 시
      // DOM에서 삭제
      entryRow.remove();
      if( entrySection.querySelectorAll(".entry-row").length === 0) {
      // entry-row가 하나도 없으면 entry-date-section도 삭제
        entrySection.remove();
      }
      // 배열에서 삭제
      sharedState.entries = sharedState.entries.filter(entry => entry.id !== id);
      const date = entrySection.getAttribute("data-date");
        const yearMonth = date.split("-").slice(0, 2).join("-");
      deleteEntry(yearMonth,id);
      deleteModal.classList.add("delete-hidden");
      
    });
      cancelDeleteBtn.addEventListener("click", () => {
      // 삭제 취소 버튼 클릭 시
      deleteModal.classList.add("delete-hidden");
    });
  });
}

export async function getDateFromServer(entry) {
    const entryList = document.getElementById("entry-list");

    const dateObj = new Date(entry.date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const weekday = ['일', '월', '화', '수', '목', '금', '토'][dateObj.getDay()];
    const dateLabel = `${month}월 ${day}일 ${weekday}요일`;

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
      <div class="entry-amount-delete">
        <div class="entry-amount ${amountClass}">${sign}${entry.amount.toLocaleString()}원</div>
        <div class="delete-btn">
          <div class="delete-icon-wrapper">
          <img src="../../assets/icons/delete-botton.svg" alt="삭제" class="delete-icon"></img>
          삭제
          </div>
        </div>
      </div>
    `;
    entryItems.appendChild(item);
    
  }