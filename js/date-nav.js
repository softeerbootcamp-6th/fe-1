// 달력 헤더 초기화
export const createDateNav = ({ navEl, onChange = () => { } }) => {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // navEl에서 연도, 월, 이름, 이전, 다음 버튼 요소를 가져옴
    const yearEl = navEl.querySelector('.year');
    const monEl = navEl.querySelector('.month');
    const nameEl = navEl.querySelector('.month-name');
    const prevBtn = navEl.querySelector('.prev');
    const nextBtn = navEl.querySelector('.next');

    let year, month;

    // 현재 연월을 DOM의 요소에 설정하는 함수
    const render = () => {
        yearEl.textContent = year;
        monEl.textContent = month;
        nameEl.textContent = monthNames[month - 1];
    };

    // 현재 날짜를 기준으로 연도와 월을 설정하고 렌더링
    const setToday = () => {
        const d = new Date();
        year = d.getFullYear();
        month = d.getMonth() + 1;
        render();
    };

    // 이전, 다음 달로 이동하는 함수
    // dir은 -1(이전 달) 또는 +1(다음 달)
    // onChange 콜백을 호출하여 연도와 월을 전달
    const shift = dir => {
        month += dir;
        if (month < 1) { month = 12; year--; }
        if (month > 12) { month = 1; year++; }
        render();
        onChange({ year, month });
    };

    // 이전, 다음 버튼 클릭 시 shift 함수 호출
    prevBtn.onclick = () => shift(-1);
    nextBtn.onclick = () => shift(+1);

    setToday();

    return { getYear: () => year, getMonth: () => month, setDate: (y, m) => { year = y; month = m; render(); } };
};