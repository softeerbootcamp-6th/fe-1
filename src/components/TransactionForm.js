export function renderTransactionForm() {
  const content = document.getElementById("transaction-form");
  content.className = "flex-column-between";
  content.innerHTML = `
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
                            <button type="button" id="typeToggle">-</button>
                        <input type="number" name="amount" value="0" /> 원
                        </td>
                        <td>
                        <input type="text" name="description" placeholder="입력하세요" maxlength="32" />
                        </td>
                        <td>
                        <select name="payment">
                            <option selected disabled>카드</option>
                        </select>
                        </td>
                        <td>
                        <select name="category">
                            <option selected disabled>음식</option>
                        </select>
                        </td>
                        <td>
                        <button type="submit">✓</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
        `;
  return content;
}
