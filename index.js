// DOMContent가 로드된 후에 실행됨
document.addEventListener('DOMContentLoaded', () => {

    // *****
    // ***** header 부분 코드 *****
    // *****

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    // 클래스이름으로 html 요소를 선택함, month-nav 클래스의 첫번째 요소를 선택(하나만 존재하긴 함)
    const monthNav = document.getElementsByClassName('month-nav')[0];

    // 쿼리셀렉터를 사용하여 year, month, month-name 클래스를 가진 요소들을 선택
    let year = monthNav.querySelector('.year').textContent; // 초기 연도 설정
    let month = monthNav.querySelector('.month').textContent; // 초기 월 설정
    let monthName = monthNav.querySelector('.month-name').textContent; // 초기 월 이름 설정

    // 현재 날짜를 불러오고 표시하는 함수
    const setCurrentDate = () => {
        // 현재 날짜를 가져옴
        const today = new Date();
        // 현재 날짜로 업데이트
        year = today.getFullYear();
        // 월은 0부터 시작하므로 +1을 해줌
        month = today.getMonth() + 1;
        // 월 이름을 가져와서 표시, 영어로 표시, toLocaleString에서 month만 가져옴
        monthName = today.toLocaleString('en-US', { month: 'long' });
    };

    // 날짜 표시창에 현재 날짜를 업데이트하는 함수
    const updateDateDisplay = () => {
        monthNav.querySelector('.year').textContent = year;
        monthNav.querySelector('.month').textContent = month;
        monthNav.querySelector('.month-name').textContent = monthName;
    };

    setCurrentDate();
    updateDateDisplay();

    const prevBtn = monthNav.querySelector('.prev'); // 이전 버튼
    const nextBtn = monthNav.querySelector('.next'); // 다음 버튼

    prevBtn.addEventListener('click', () => {
        // 이전 버튼 클릭 시
        month -= 1;
        if (month < 1) {
            month = 12;
            year -= 1;
        }
        monthName = monthList[month - 1];
        updateDateDisplay();
    });

    nextBtn.addEventListener('click', () => {
        // 다음 버튼 클릭 시
        month += 1;
        if (month > 12) {
            month = 1;
            year += 1;
        }
        monthName = monthList[month - 1];
        updateDateDisplay();
    });

    // *****
    // ***** form 부분 코드 *****
    // *****

    const form = document.getElementsByClassName('detail-form')[0];
    const formDate = form.querySelector('#form-date');

    // detail-form의 날짜 입력 필드 설정
    const setDetailFormDate = () => {
        // 오늘 날짜를 YYYY-MM-DD 형식으로 설정
        const today = new Date();
        formDate.value = today.toISOString().split('T')[0];
    };
    setDetailFormDate();

    const formSign = form.querySelector('#form-sign');
    let sign = formSign.textContent; // 초기 기호 설정

    // ----- 카테고리 선택(select) 동적 옵션 처리 -----
    const categorySelect = form.querySelector('#form-category');

    // 지출(−)·수입(+) 카테고리 정의
    const expenseCategories = [
        { value: 'life', label: '생활' },
        { value: 'food', label: '식비' },
        { value: 'transport', label: '교통' },
        { value: 'shopping', label: '쇼핑/뷰티' },
        { value: 'health', label: '의료/건강' },
        { value: 'culture', label: '문화/여가' },
        { value: 'nocategory', label: '미분류' },
    ];

    const incomeCategories = [
        { value: 'salary', label: '월급' },
        { value: 'allowance', label: '용돈' },
        { value: 'etc', label: '기타 수입' },
    ];

    // placeholder(option 0)를 제외한 나머지를 지우고 새로 채워 넣는 함수
    const populateCategoryOptions = (isExpense) => {
        // 기존 옵션 제거 (placeholder 제외)
        while (categorySelect.options.length > 1) {
            categorySelect.remove(1);
        }
        const list = isExpense ? expenseCategories : incomeCategories;
        list.forEach(({ value, label }) => {
            const opt = document.createElement('option');
            opt.value = value;
            opt.textContent = label;
            categorySelect.appendChild(opt);
        });
    };

    // 최초 로드 시 현재 sign 기준으로 옵션 세팅
    populateCategoryOptions(sign === '-');

    // --------------------------------------------

    formSign.addEventListener('click', () => {
        // 기호 토글
        sign = (sign === '-') ? '+' : '-';
        formSign.textContent = sign;

        // sign 변경에 따라 카테고리 옵션 갱신
        populateCategoryOptions(sign === '-');
    });

    // 결제수단 추가하기 선택 시
    const methodSelect = form.querySelector('#form-method');

    // 모달을 동적으로 생성‧표시하는 함수
    const showModal = () => {
        // 반투명 오버레이
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';

        // 모달 박스
        const modal = document.createElement('div');
        modal.className = 'modal';

        // 모달 내용
        modal.innerHTML = `
            <!-- ===== 모달 박스 ===== -->
            <div class="modal-box">
                <!-- 안내 문구 -->
                <h2 class="modal-title">추가하실 결제 수단을 입력해주세요.</h2>

                <!-- 입력창 -->
                <input
                type="text"
                class="modal-input"
                placeholder="placeholder"
                aria-label="새 결제수단 입력"
                />

                <!-- 하단 버튼 영역 -->
                <div class="modal-actions">
                    <button type="button" class="modal-btn cancel">취소</button>
                    <button type="button" class="modal-btn confirm">추가</button>
                </div>
            </div>
        `;

        // 트리 연결
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // 닫기(확인 버튼 또는 오버레이 클릭)
        overlay.querySelector('.cancel').addEventListener('click', () => overlay.remove());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
    };

    // “추가하기” 버튼 클릭 시 모달 표시
    if (methodSelect) {
        methodSelect.addEventListener('change', (e) => {
            // 선택된 값이 "add"일 때만 모달 표시
            if (e.target.value === 'add') {
                e.preventDefault(); // 기본 동작 방지
                showModal();
                // 선택된 값을 초기화 (placeholder로 되돌리기)
                methodSelect.selectedIndex = 0; // placeholder로 되돌리기

                // 모달에서 결제수단 추가 버튼 클릭 시
                const modal = document.querySelector('.modal-box');
                if (modal) {
                    modal.querySelector('.confirm').addEventListener('click', () => {
                        const modalOverlay = document.querySelector('.modal-overlay');

                        const input = modal.querySelector('.modal-input');
                        const newMethod = input.value.trim();
                        if (newMethod) {
                            // 결제수단의 중복체크
                            const existingOptions = Array.from(methodSelect.options);
                            newMethod.toLowerCase().replace(/\s+/g, '-'); // 공백을 하이픈으로 변환
                            const isDuplicate = existingOptions.some(opt => opt.value.toLowerCase() === newMethod);
                            if (isDuplicate) {
                                alert('이미 추가한 결제수단입니다.');
                                input.value = ''; // 입력 필드 초기화
                                return;
                            }

                            // 새로운 결제수단을 select에 추가
                            const newOption = document.createElement('option');
                            newOption.textContent = newMethod;

                            const newValue = "custom-" + (methodSelect.options.length - 3); // "custom-1", "custom-2" 등으로 설정
                            newOption.value = newValue; // value 속성 설정

                            const lastOption = methodSelect.options[methodSelect.options.length - 1];
                            // 마지막 옵션 그 앞에 추가
                            methodSelect.insertBefore(newOption, lastOption);
                        }
                        // 모달 닫기
                        modalOverlay.remove();
                    });
                }
            }
        });
    }

    // // ----- 모든 입력값이 채워졌을 때만 제출 버튼 활성화 -----
    const submitBtn = form.querySelector('.submit-btn');
    const amountInput = form.querySelector('#form-amount');
    const memoInput = form.querySelector('#form-memo');

    const validateForm = () => {
        const isDate = formDate.value.trim() !== '';
        // 금액 입력 필드가 비어있지 않고 숫자 형식인지 검사
        // replace(/,/g,'')로 콤마 제거 후 숫자로 변환하여 검사
        // isNaN은 숫자가 아닌 경우 true를 반환하므로, !isNaN으로 숫자인 경우를 검사
        // trim()으로 공백 제거
        const isAmount = amountInput.value.trim() !== '' && !isNaN(Number(amountInput.value.replace(/,/g, '')));
        const isMemo = memoInput.value.trim() !== '';
        const isMethod = methodSelect.selectedIndex > 0;   // placeholder는 index 0
        const isCategory = categorySelect.selectedIndex > 0; // placeholder는 index 0

        const allValid = isDate && isAmount && isMemo && isMethod && isCategory;

        if (allValid) {
            submitBtn.disabled = false;
            submitBtn.classList.add('active');
        } else {
            submitBtn.disabled = true;
            submitBtn.classList.remove('active');
        }
    };

    // 각 필드 변화 시마다 검사
    [formDate, amountInput, memoInput, methodSelect, categorySelect].forEach(el => {
        el.addEventListener('input', validateForm);
        el.addEventListener('change', validateForm);
    });

    // 금액 입력 필드에 숫자만 입력되도록 제한 및 세 자리수 단위로 콤마 추가
    amountInput.addEventListener('input', (e) => {
        // 숫자만 입력되도록 필터링
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        // 세 자리수 단위로 콤마 추가
        e.target.value = e.target.value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

    // 초기 상태 검사
    validateForm();

    // *****
    // ***** 전체 내역 부분 코드 *****
    // *****


    const monthSummary = document.querySelector('.month-summary');

    const weekdayKo = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];

    form.addEventListener('submit', e => {
        e.preventDefault();        // 새로고침 방지

        // ----- 입력값 -----
        const dateStr = formDate.value;                      // YYYY-MM-DD
        const amountNum = Number(amountInput.value.replace(/,/g, ''));
        if (!amountNum) return;                                // 0이면 무시

        const memoText = memoInput.value.trim();
        const methodVal = methodSelect.value;
        if (methodVal === 'add') return;                       // "추가하기" 선택
        const methodTxt = methodSelect.options[methodSelect.selectedIndex].textContent;
        const categoryVal = categorySelect.value;
        const categoryTxt = categorySelect.options[categorySelect.selectedIndex].textContent;

        // ----- 날짜 그룹(article) 찾기/생성 -----
        let dayGroup = monthSummary.querySelector(`article[data-date="${dateStr}"]`);
        if (!dayGroup) {
            const d = new Date(dateStr);
            const headerHtml = `
            <header class="day-header">
                <time datetime="${dateStr}">
                ${d.getMonth() + 1}월 ${d.getDate()}일 <span class="weekday">${weekdayKo[d.getDay()]}</span>
                </time>
                <output class="day-total"></output>
            </header>
            <ul class="entries"></ul>
            `;
            dayGroup = document.createElement('article');
            dayGroup.className = 'day-group';
            dayGroup.dataset.date = dateStr;
            dayGroup.innerHTML = headerHtml;
            // ── 최신일을 헤더 바로 뒤에 추가 ──
            const firstGroup = monthSummary.querySelector('.day-group'); // 기존 첫 번째 그룹
            if (firstGroup) {
                monthSummary.insertBefore(dayGroup, firstGroup);         // 헤더보다 뒤, 첫 그룹보다 앞
            } else {
                monthSummary.appendChild(dayGroup);                      // 아직 그룹이 없을 때
            }
        }
        const ul = dayGroup.querySelector('.entries');

        // ----- li 생성 -----
        const isExpense = (sign === '-');
        const li = document.createElement('li');
        li.className = `entry ${isExpense ? 'spend' : 'income'}`;
        li.innerHTML = `
            <span class="badge category ${categoryVal}">${categoryTxt}</span>
            <span class="detail">${memoText}</span>
            <span class="payment">${methodTxt}</span>
            <span class="amount">${sign}${amountNum.toLocaleString('ko-KR')}원</span>
        `;
        ul.appendChild(li);

        sortEntriesByDate(); // 날짜별로 정렬

        // ----- 그룹 합계 갱신 -----
        let total = 0;
        ul.querySelectorAll('.amount').forEach(span => {
            total += Number(span.textContent.replace(/[^\d-]/g, ''));
        });
        const out = dayGroup.querySelector('.day-total');
        out.textContent = (total < 0 ? '지출 ' : '수입 ') + Math.abs(total).toLocaleString('ko-KR') + '원';
        out.className = `day-total ${total < 0 ? 'spend' : 'income'}`;

        calculateMonthSummary(); // 월별 요약 계산

        // ----- 폼 초기화 -----
        memoInput.value = '';
        amountInput.value = '';
        methodSelect.selectedIndex = 0;
        categorySelect.selectedIndex = 0;
        validateForm();
        memoInput.focus();
    });

    // article을 날짜에 따라 정렬하는 함수
    // ───────── 날짜 그룹(article)만 정렬 ─────────
    const sortEntriesByDate = () => {
        // ① 헤더는 따로 보관
        const header = monthSummary.querySelector('.month-header');

        // ② 모든 day-group 수집
        const groups = Array.from(monthSummary.querySelectorAll('article.day-group'));

        // ③ 날짜 내림차순 정렬
        groups.sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date));

        // ④ 기존 day-group을 전부 떼어내기
        groups.forEach(g => monthSummary.removeChild(g));

        // ⑤ 헤더 뒤에 정렬된 그룹을 순서대로 삽입
        groups.forEach(g => monthSummary.appendChild(g));
    };
    sortEntriesByDate(); // 페이지 로드 시 정렬

    // 월별 가계부 내역의 월별 요약의 전체 내역 및 수입, 지출을 계산하는 함수
    const calculateMonthSummary = () => {
        const allEntries = monthSummary.querySelectorAll('li.entry');
        const totalCount = allEntries.length;

        let totalIncome = 0;
        let totalExpense = 0;

        allEntries.forEach(li => {
            // “-10,900원” → -10900
            const num = Number(li.querySelector('.amount')
                .textContent.replace(/[^\d-]/g, ''));
            if (num < 0) {
                totalExpense += Math.abs(num);
            } else {
                totalIncome += num;
            }
        });

        // 헤더에 값 반영
        const countSpan = monthSummary.querySelector('.total.count');
        const ieSpan = monthSummary.querySelector('.total.income-spend');

        if (countSpan) {
            countSpan.textContent = `전체 내역 ${totalCount}건`;
        }
        if (ieSpan) {
            ieSpan.textContent =
                `수입 ${totalIncome.toLocaleString('ko-KR')}원   ` +
                `지출 ${totalExpense.toLocaleString('ko-KR')}원`;
        }
    }
    calculateMonthSummary(); // 페이지 로드 시 요약 계산

});