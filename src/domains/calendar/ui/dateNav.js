import { MONTH_NAMES } from '../../../shared/constants/time.js';
import { CalendarModel } from '../model/calendarModel.js';

export const initDateNav = ({ navEl }) => {
    // 캘린더 모델 생성
    const model = new CalendarModel();

    // 연월, 월의 이름의 DOM 요소들
    const yEl = navEl.querySelector('.year');
    const mEl = navEl.querySelector('.month');
    const nameEl = navEl.querySelector('.month-name');

    // 현재 연월을 DOM에 설정하는 함수
    const render = () => {
        yEl.textContent = model.year;
        mEl.textContent = model.month;
        nameEl.textContent = MONTH_NAMES[model.month - 1];
    };

    // 현재 날짜를 기준으로 연도와 월을 설정하고 렌더링
    const shift = (d) => {
        model.shift(d);
        render();
    };
    // 이전, 다음 버튼 클릭 시 shift 함수 호출 -> 월, 연도 변경
    navEl.querySelector('.prev').addEventListener('click', () => shift(-1));
    navEl.querySelector('.next').addEventListener('click', () => shift(+1));
    // 변경 후 다시 렌더링
    render();
    return { setDate: (y, m) => { model.set(y, m); render(); }, getDate: () => model.get() };
};
