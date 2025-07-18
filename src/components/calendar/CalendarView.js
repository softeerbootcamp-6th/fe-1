import DateState from "../../store/DateState.js";
import ItemsState from "../../store/ItemsState.js";
import { parseYMD } from "../../utils/date.js";
import { renderComponent } from "../../utils/render.js";

function createTableHead() {
  return `
    <thead>
      <tr>
        <th>일</th>
        <th>월</th>
        <th>화</th>
        <th>수</th>
        <th>목</th>
        <th>금</th>
        <th>토</th>
      </tr>
    </thead>
    `;
}

function createTableBody() {
  return `
    <tbody id="calendar-body"></tbody>
`;
}

function rendercurMonthCalendar() {
  const transactions = ItemsState.getItems();
  const { year, month } = parseYMD(DateState.getDate());
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const calendarBody = document.getElementById("calendar-body");
  if (!calendarBody) return;
  calendarBody.innerHTML = "";
  const totalCells = firstDay + lastDate;
  const weeks = Math.ceil(totalCells / 7);

  let day = 1;

  Array.from({ length: weeks }).map((_, w) => {
    const row = document.createElement("tr");

    Array.from({ length: 7 }).map((_, d) => {
      const cell = document.createElement("td");

      if (w === 0 && d < firstDay) {
        cell.innerHTML = "";
      } else if (day > lastDate) {
        cell.innerHTML = "";
      } else {
        const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
          day
        ).padStart(2, "0")}`;
        const dateDiv = document.createElement("div");
        dateDiv.className = "date-number";
        dateDiv.textContent = day;

        const txns = transactions.filter((txn) => txn.date === dateStr);
        const txnDivs = txns.map((txn) => {
          const div = document.createElement("div");
          div.className = `transaction-${
            txn.type === "withdraw" ? "expense" : "income"
          }`;
          let minus = "";
          if (txn.type === "withdraw") minus = "-";
          div.textContent = minus + txn.amount.toLocaleString();
          return div;
        });

        cell.appendChild(dateDiv);
        txnDivs.forEach((div) => cell.appendChild(div));

        day++;
      }

      row.appendChild(cell);
    });

    calendarBody.appendChild(row);
  });
}

export function renderCalendar() {
  let innerHTML = "";
  innerHTML += createTableHead();
  innerHTML += createTableBody();
  renderComponent({
    id: "calendar",
    className: "calendar font-light-12",
    innerHTML,
  });
  rendercurMonthCalendar();
}
