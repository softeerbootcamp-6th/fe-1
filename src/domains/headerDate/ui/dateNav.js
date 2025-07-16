import {MONTH_NAMES} from '../../../shared/constants/time.js';
import {HeaderDateModel} from '../model/headerDateModel.js';

// UI 렌더링만 담당하는 순수 함수
const renderDateDisplay = ({yearElement, monthElement, monthNameElement, year, month}) => {
    yearElement.textContent = year;
    monthElement.textContent = month;
    monthNameElement.textContent = MONTH_NAMES[month - 1];
};

// 상태를 Store로 동기화하는 함수
const syncStateToStore = ({headerDateModel, dateStore}) => {
    const {year, month} = headerDateModel.get();
    dateStore.dispatch('DATE/SET', {year, month});
};

// 이전 달로 이동
const navigateToPreviousMonth = ({headerDateModel, dateStore}) => {
    headerDateModel.shift(-1);
    syncStateToStore({headerDateModel, dateStore});
};

// 다음 달로 이동
const navigateToNextMonth = ({headerDateModel, dateStore}) => {
    headerDateModel.shift(1);
    syncStateToStore({headerDateModel, dateStore});
};

export const initDateNav = ({navEl, dateStore}) => {
    // DOM 요소 참조 - 초기화 시 한 번만 수행
    const yearElement = navEl.querySelector('.year');
    const monthElement = navEl.querySelector('.month');
    const monthNameElement = navEl.querySelector('.month-name');
    const prevButton = navEl.querySelector('.prev');
    const nextButton = navEl.querySelector('.next');

    // 모델 생성
    const headerDateModel = new HeaderDateModel();

    // 이벤트 리스너 등록
    prevButton.addEventListener('click', () => navigateToPreviousMonth({headerDateModel, dateStore}));
    nextButton.addEventListener('click', () => navigateToNextMonth({headerDateModel, dateStore}));

    const render = (state) => {
        // Store의 상태를 기반으로 UI 업데이트
        renderDateDisplay({
            yearElement: yearElement,
            monthElement: monthElement,
            monthNameElement: monthNameElement,
            year: state.year,
            month: state.month
        });
    }

    // Store 상태 변경 구독
    dateStore.subscribe(render);

    // 초기 상태 설정 및 UI 렌더링
    syncStateToStore({headerDateModel, dateStore});
    render(dateStore.getState());

};