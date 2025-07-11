// month-summary를 클래스로 가진 Element(월별 가계부 내역 (section Tag))를 summaryEl로 전달
export const createSummaryManager = ({ summaryEl }) => {
    const header = summaryEl.querySelector('.month-header');
    const weekday = ['일', '월', '화', '수', '목', '금', '토'];

    // 요약을 정렬하는 함수
    const sortGroups = () => {
        // summaryEl의 모든 day-group(article Tag) 요소를 가져와서 gs로 저장
        const gs = [...summaryEl.querySelectorAll('article.day-group')];
        // gs를 날짜 기준으로 내림차순 정렬
        gs.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));
        // 정렬된 요소들을 summaryEl에 다시 추가
        gs.forEach(g => summaryEl.appendChild(g));
        // 헤더를 summaryEl의 맨 앞에 추가(헤더 뒤에는 정렬된 리스트들이 오도록)
        if (header) summaryEl.prepend(header);
    };

    // 요약의 총합을 계산하는 함수
    const calcTotals = (target) => {
        const lis = target.querySelectorAll('li.entry');
        // inc, exp는 각각 수입과 지출의 총합을 저장
        let inc = 0, exp = 0;
        lis.forEach(li => {
            // li의 금액을 가져와서 숫자로 변환
            // 금액에서 숫자가 아닌 문자(예: '원')를 제거하고,
            // 부호에 따라 inc 또는 exp에 더함
            // "/[^\d-]/g"는 숫자와 '-'를 제외한 모든 문자를 제거하는 정규 표현식
            const n = +li.querySelector('.amount').textContent.replace(/[^\d-]/g, '');
            n < 0 ? exp += -n : inc += n;
        });
        // target이 summaryEl(전체 요약)인지, 아니면 특정 날짜의 그룹(article Tag)인지 확인
        if (target === summaryEl) {
            // 전체 요약의 경우, 전체 내역과 수입/지출 총합을 표시
            summaryEl.querySelector('.total.count').textContent = `전체 내역 ${lis.length}건`;
            summaryEl.querySelector('.total.income-spend').textContent =
                `수입 ${inc.toLocaleString('ko-KR')}원   지출 ${exp.toLocaleString('ko-KR')}원`;
        } else {
            // 특정 날짜의 그룹(article Tag)의 경우, 해당 날짜의 총합을 표시
            const out = target.querySelector('.day-total');
            const total = inc - exp;
            out.textContent =
                `${total < 0 ? '지출' : '수입'} ${Math.abs(total).toLocaleString('ko-KR')}원`;
            out.className = `day-total ${total < 0 ? 'spend' : 'income'}`;
        }
    };

    // 요약에 새 항목을 추가하는 함수
    // 날짜, 부호, 금액, 메모, 카테고리, 결제수단 정보를 한 객체로 받음
    const addEntry = ({ date, sign, amount, memo, category, method }) => {
        // 날짜에 해당하는 그룹(article Tag)이 이미 있는지 확인
        let group = summaryEl.querySelector(`article[data-date="${date}"]`);
        if (!group) {
            // 날짜에 해당하는 그룹이 없으면 새로 생성
            const d = new Date(date);
            group = document.createElement('article');
            group.className = 'day-group';
            group.dataset.date = date;
            group.innerHTML = `
        <header class="day-header">
          <time datetime="${date}">${d.getMonth() + 1}월 ${d.getDate()}일
            <span class="weekday">${weekday[d.getDay()]}</span>
          </time><output class="day-total"></output>
        </header><ul class="entries"></ul>`;
            summaryEl.appendChild(group);
        }

        // 그룹 내에 새 항목(li) 생성
        const li = document.createElement('li');
        // li의 클래스는 'entry'와 부호에 따라 'spend' 또는 'income'으로 설정
        li.className = `entry ${sign === '-' ? 'spend' : 'income'}`;
        li.innerHTML = `
      <span class="badge category ${category.value}">${category.text}</span>
      <span class="detail">${memo}</span>
      <span class="payment">${method.text}</span>
      <span class="amount">${sign}${amount.toLocaleString('ko-KR')}원</span>
      <button type="button" class="delete-btn" aria-label="삭제">X</button>`;
        group.querySelector('.entries').appendChild(li);

        sortGroups();
        calcTotals(group);
        calcTotals(summaryEl);
    };

    // 요약에서 항목을 삭제하는 함수
    const deleteEntry = (entry) => {
        // entry는 삭제할 항목(li) 요소
        const group = entry.closest('article.day-group');
        // entry를 그룹에서 제거
        entry.remove();
        // 그룹이 비어있으면 그룹(article Tag)도 제거
        if (group.querySelector('.entries').children.length === 0) {
            group.remove();
            // 그룹이 제거되면 전체 요약에서 해당 날짜의 총합도 제거
            const date = group.dataset.date;
            const total = summaryEl.querySelector(`.day-group[data-date="${date}"] .day-total`);
            if (total) total.remove();
        }
        
        // 그룹의 총합을 다시 계산
        calcTotals(group);
        // 전체 요약의 총합도 다시 계산
        calcTotals(summaryEl);
    };

    return { addEntry, sortGroups, calcTotals, deleteEntry };
};