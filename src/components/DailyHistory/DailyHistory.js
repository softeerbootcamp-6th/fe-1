import { CategoryTag, Button } from "../index.js";

/**
 * DailyHistory 컴포넌트
 *
 * 사용법
 * const dailyHistory = DailyHistory({
 *   date: "2025-07-24",
 *   items: [
 *     {
 *       date: "2025-07-24",
 *       category: "의료/건강",
 *       description: "저녁 약속",
 *       method: "국민카드",
 *       type: "expense",
 *       amount: 381329,
 *     },
 *   ],
 * });
 *
 * document.body.appendChild(dailyHistory);
 */
const DailyHistory = ({ date = "", items = [] } = {}) => {
  const totalIncome = items.reduce((acc, item) => {
    return acc + (item.type === "income" ? item.amount : 0);
  }, 0);

  const totalExpense = items.reduce((acc, item) => {
    return acc + (item.type === "expense" ? item.amount : 0);
  }, 0);

  const article = document.createElement("article");
  article.className = "history__daily-list";

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
      onClick: () => {
        li.remove();
        if (ul.children.length === 0) {
          article.remove();
        }

        const transactionsData = localStorage.getItem("transactionsData");
        const transactions = transactionsData
          ? JSON.parse(transactionsData)
          : {};

        const monthKey =
          item.date.split("-")[0] + "-" + item.date.split("-")[1];

        transactions[monthKey] = transactions[monthKey].filter(
          (transaction) => transaction.id !== item.id
        );

        localStorage.setItem("transactionsData", JSON.stringify(transactions));
      },
    });
    deleteButton.className = "content-row__delete-button font-semibold-12";

    infoDiv.append(description, method, amount, deleteButton);
    li.append(categoryDiv, infoDiv);
    ul.appendChild(li);
  });

  article.append(header, ul);

  return article;
};

export default DailyHistory;
