const DeleteModalTemplate = ({
  date,
  type,
  amount,
  description,
  method,
  category,
}) => {
  return `
    <ul class="font-light-12">
      <li>
        <p>날짜: ${date}</p>
      </li>
      <li>
        <p>카테고리: ${type === "expense" ? "지출" : "수입"}/${category}</p>
      </li>
      <li>
        <p>내용: ${description}</p>
      </li>
      <li>
        <p>결제수단: ${method}</p>
      </li>
      <li>
        <p>금액: ${amount.toLocaleString()}원</p>
      </li>
    </ul>
    `;
};

export default DeleteModalTemplate;
