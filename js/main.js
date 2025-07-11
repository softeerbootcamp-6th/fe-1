import { createDateNav } from './date-nav.js';
import {
    expenseCategories,
    incomeCategories,
    fillCategoryOptions
} from './categories.js';
import { showModal } from './modal.js';
import {
    addCommaFormatter,
    bindValidation
} from './form-validate.js';
import { createSummaryManager } from './summary.js';

document.addEventListener('DOMContentLoaded', () => {
    /* ---------- 헤더 ---------- */
    // 현재 연월을 불러오고 이전, 다음 달로 이동할 수 있는 네비게이션 생성 및 렌더링
    createDateNav({
        navEl: document.querySelector('.month-nav'),
        onChange: ({ year, month }) => console.log('달력 이동', year, month)
    });

    /* ---------- 폼 ---------- */
    // 자세 내역 정보를 입력하는 폼
    const form = document.querySelector('.detail-form');
    // 폼의 필드 요소들을 객체로 묶음
    const els = {
        date: form.querySelector('#form-date'),
        signBtn: form.querySelector('#form-sign'),
        catSel: form.querySelector('#form-category'),
        methSel: form.querySelector('#form-method'),
        amtInp: form.querySelector('#form-amount'),
        memoInp: form.querySelector('#form-memo'),
        submit: form.querySelector('.submit-btn')
    };

    // 오늘 날짜
    els.date.value = new Date().toISOString().split('T')[0];
    // 폼의 금액 입력 필드에 숫자만 입력하고 3자리마다 콤마를 추가하는 포맷터 적용하는 함수
    addCommaFormatter(els.amtInp);

    // 금액의 부호를 가져옴
    let sign = els.signBtn.textContent.trim();
    // 부호에 따라 카테고리 옵션을 필터링하여 선택할 수 있도록 함
    const refreshCat = () =>
        fillCategoryOptions(els.catSel, sign === '-',
            expenseCategories, incomeCategories);

    // 함수 실행
    refreshCat();

    // 부호 버튼 클릭 시 부호를 토글하고 카테고리 옵션을 갱신
    els.signBtn.onclick = () => { sign = sign === '-' ? '+' : '-'; els.signBtn.textContent = sign; refreshCat(); };

    // 결제수단에서 '추가하기' 옵션 선택 시 모달을 띄워 새 결제수단을 입력받음
    els.methSel.onchange = e => {
        // '추가하기' 옵션이 선택되었을 때만 모달을 띄움
        if (e.target.value !== 'add') return;
        // 모달을 띄워 새 결제수단을 입력받음
        // newMeth는 모달에서 입력받은 결제수단 이름
        // newMeth를 parameter로 한 함수가 parameter(onConfirm)로 전달됨
        showModal((newMeth) => {
            // .some() 메서드를 사용하여 이미 추가된 결제수단인지 확인
            const exists = [...els.methSel.options]
                .some(o => o.textContent.toLowerCase() === newMeth.toLowerCase());

            if (exists) {
                alert('이미 추가한 결제수단입니다');
                return;                                     // 삽입 취소
            }

            const opt = new Option(
                newMeth,
                `custom-${els.methSel.options.length - 3}`   // 기존의 옵션들을 뺀 인덱스 기반의 값
            );
            // 새 결제수단 옵션을 마지막 옵션 앞에 삽입
            els.methSel.insertBefore(opt, els.methSel.lastElementChild);
            // 새 옵션을 선택 상태로 설정
            opt.selected = true;
        });
        // 모달이 닫히면 결제수단 선택을 초기화
        els.methSel.selectedIndex = 0;
    };

    // 폼의 필드들이 다 채워져있는지 확인하는 함수
    bindValidation(
        [els.date, els.amtInp, els.memoInp, els.methSel, els.catSel],
        els.submit
    );

    /* ---------- 요약 ---------- */
    const summaryEl = document.querySelector('.month-summary');

    // 함수의 인자를 객체로 묶어 전달
    // 순서가 바뀌어도 값에 맞는 값을 전달할 수 있음
    // 객체({})로 묶지 않는다면 순서가 바뀌면 값이 잘못 전달될 수 있음
    const summary = createSummaryManager({
        summaryEl: summaryEl
    });

    // 요약을 정렬하는 함수 실행
    summary.sortGroups();
    // 요약의 총합을 계산하는 함수 실행
    summary.calcTotals(summaryEl);
    // 요약의 그룹들의 총합을 계산
    summaryEl.querySelectorAll('article.day-group')
        .forEach(g => summary.calcTotals(g));

    // 폼 제출 시 요약에 새 항목을 추가
    form.onsubmit = (e) => {
        // 새로고침 방지
        e.preventDefault();
        // 폼의 값들을 통해 요약에 새 항목을 추가
        // addEntry 함수에 필요한 값들을 객체로 묶어 전달
        summary.addEntry({
            date: els.date.value,
            sign,
            amount: +els.amtInp.value.replace(/,/g, ''),
            memo: els.memoInp.value.trim(),
            category: {
                value: els.catSel.value,
                text: els.catSel.options[els.catSel.selectedIndex].textContent
            },
            method: {
                value: els.methSel.value,
                text: els.methSel.options[els.methSel.selectedIndex].textContent
            }
        });
        // 폼 제출 후 필드들을 초기화
        els.memoInp.value = ''; els.amtInp.value = '';
        els.catSel.selectedIndex = els.methSel.selectedIndex = 0;
        els.memoInp.focus();
    };
});