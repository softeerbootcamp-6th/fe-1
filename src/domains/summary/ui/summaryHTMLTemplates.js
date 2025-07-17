import { WEEKDAY } from '../../../shared/constants/time.js';

// summary에 새로운 날짜 그룹(article Tag)을 추가할 때 사용할 HTML 템플릿
export const dayGroupHTML = (date) => {
  const d = new Date(date);
  // 커스텀 데이터 속성인 data-date에 날짜를 저장해서 날짜별 그룹을 관리
  return `
    <article class="day-group" data-date="${date}">
      <header class="day-header">
        <time datetime="${date}">${d.getMonth() + 1}월 ${d.getDate()}일
          <span class="weekday">${WEEKDAY[d.getDay()]}</span>
        </time>
        <output class="day-total"></output>
      </header>
      <ul class="entries"></ul>
    </article>
  `;
};

// summary에 새로운 항목(li)을 추가할 때 사용할 HTML 템플릿
export const entryHTML = ({ entry, entryKey }) => {
  const { id, sign, category, memo, method, amount } = entry;
  const signClass = sign === '+' ? 'income' : 'spend';

  return `
    <li class="entry ${signClass}" data-entry-key="${entryKey}">
      <span class="badge category ${category.text}">${category.text}</span>
      <span class="detail">${memo}</span>
      <span class="payment">${method.text}</span>
      <span class="amount">${sign}${Math.abs(amount).toLocaleString('ko-KR')}원</span>
      <button type="button" class="delete-btn" aria-label="삭제">X</button>
    </li>
  `;
};
