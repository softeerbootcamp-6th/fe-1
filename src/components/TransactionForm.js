import { setState, state } from "../store.js";
import { addEventListener } from "../utils/addEvent.js";
import { renderComponent } from "../utils/render.js";

export function initTransactionForm() {
  addEventListener({
    id: "transaction-form",
    event: "submit",
    onEvent: (e) => {
      e.preventDefault();
      addItem({ form: e.target });
    },
  });
  renderTransactionForm();
}

function addItem({ form }) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  const item = {
    ...data,
    id: Date.now(), // TODO - generateNextId 생성
  };

  setState({
    items: [...state.items, item],
  });
}

function renderTransactionForm() {
  renderComponent({
    id: "transaction-form",
    className: "flex-column-center",
    innerHTML: `
        <table>
            <thead>
            <tr>
                <th>일자</th>
                <th>금액</th>
                <th>내용</th>
                <th>결제수단</th>
                <th>분류</th>
                <th>확인</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>
                <input type="date" name="date" value="2023-08-17" />
                </td>
                <td>
                    <input type="hidden" name="type" value="withdraw" />
                    <button type="button" name="type" value="withdraw">+</button>
                <input type="number" name="amount" value="10" /> 원
                </td>
                <td>
                <input type="text" name="description" placeholder="입력하세요" maxlength="32" value="설명" />
                </td>
                <td>
                <select name="payment">
                    <option selected value="현대카드">카드</option>
                </select>
                </td>
                <td>
                <select name="category">
                    <option selected value="음식">음식</option>
                </select>
                </td>
                <td>
                <button type="submit">✓</button>
                </td>
            </tr>
            </tbody>
        </table>
    `,
  });
}
