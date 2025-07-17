import { CategoryTag, Button } from "../index.js";

const DailyHistory = ({ date = "", items = [] } = {}) => {
  const totalIncome = items.reduce((acc, item) => {
    return acc + (item.type === "income" ? item.amount : 0);
  }, 0);

  const totalExpense = items.reduce((acc, item) => {
    return acc + (item.type === "expense" ? item.amount : 0);
  }, 0);

  const article = document.createElement("article");
  article.className = "history__daily-list";
  article.dataset.date = date;

  // 헤더 생성
  const header = document.createElement("header");
  header.className = "daily-list__header font-serif-14";

  const dateDiv = document.createElement("div");
  dateDiv.className = "daily-list__date";

  // yyyy-mm-dd -> mm월 dd일 O요일
  const formattedDate = new Date(date).toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });

  const dayOfWeek = new Date(date).toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  const dateSpan = document.createElement("span");
  dateSpan.textContent = formattedDate;

  const daySpan = document.createElement("span");
  daySpan.textContent = dayOfWeek;

  dateDiv.append(dateSpan, daySpan);

  const amountDiv = document.createElement("div");
  amountDiv.className = "daily-list__amount";

  if (totalIncome > 0) {
    const incomeLabel = document.createElement("span");
    incomeLabel.textContent = "수입";
    const incomeAmount = document.createElement("span");
    incomeAmount.textContent = `${totalIncome.toLocaleString()}원`;
    amountDiv.append(incomeLabel, incomeAmount);
  }

  if (totalExpense > 0) {
    const expenseLabel = document.createElement("span");
    expenseLabel.textContent = "지출";
    const expenseAmount = document.createElement("span");
    expenseAmount.textContent = `${totalExpense.toLocaleString()}원`;
    amountDiv.append(expenseLabel, expenseAmount);
  }

  header.append(dateDiv, amountDiv);

  // 내역 리스트 생성
  const ul = document.createElement("ul");
  ul.className = "daily-list__content";

  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "daily-list__content-row font-light-14";
    li.dataset.id = item.id;

    const categoryDiv = CategoryTag({
      label: item.category,
    });

    const infoDiv = document.createElement("div");
    infoDiv.className = "content-row__info";

    const description = document.createElement("h6");
    description.className = "content-row__description";
    description.textContent = item.description;

    const method = document.createElement("div");
    method.className = "content-row__method";
    method.textContent = item.method;

    const amount = document.createElement("div");
    amount.className = `content-row__amount ${
      item.type === "income" ? "amount-positive" : "amount-negative"
    }`;
    amount.textContent = `${
      item.type === "income" ? "" : "-"
    }${item.amount.toLocaleString()}원`;

    const deleteButton = Button({
      icon: "/src/assets/icons/delete.svg",
      label: "삭제",
      size: "small",
    });
    deleteButton.className = `content-row__delete-button font-semibold-12`;
    deleteButton.dataset.type = "delete-button";

    infoDiv.append(description, method, amount, deleteButton);
    li.append(categoryDiv, infoDiv);
    ul.appendChild(li);
  });

  article.append(header, ul);

  return article;
};

export default DailyHistory;
