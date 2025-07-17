import { renderHeader } from './components/Header.js';
import { renderIncomeExpenseList } from './components/IncomeExpenseList.js';
import { renderIncomeExpenseForm } from './components/IncomeExpenseForm.js';
import { incomeExpenseStore } from './store/incomeExpenseStore.js';

document.addEventListener('DOMContentLoaded', () => {
  incomeExpenseStore.loadIncomeExpenseData().then(() => {
    const app = document.getElementById('app');
    const header = renderHeader();
    const incomeExpenseList = renderIncomeExpenseList();
    const incomeExpenseForm = renderIncomeExpenseForm();

    app.appendChild(header);
    app.appendChild(incomeExpenseList);
    app.appendChild(incomeExpenseForm);
  });
});
