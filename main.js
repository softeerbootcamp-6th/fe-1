import { renderHeader } from "./components/Header.js";
import { renderIncomeExpenseList } from "./components/IncomeExpenseList.js";


document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const header = renderHeader();
  const incomeExpenseList = renderIncomeExpenseList();
  
  app.appendChild(header);
  app.appendChild(incomeExpenseList);
});
