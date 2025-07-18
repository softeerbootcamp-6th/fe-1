import { MONTH_NAMES } from '../../../shared/constants/time.js';

// UI 렌더링만 담당하는 순수 함수
const renderDateDisplay = ({
  yearElement,
  monthElement,
  monthNameElement,
  year,
  month,
}) => {
  yearElement.textContent = year;
  monthElement.textContent = month;
  monthNameElement.textContent = MONTH_NAMES[month - 1];
};

// render 함수 팩토리
export const createRenderFunction = ({ navEl }) => {
  return (state) => {
    renderDateDisplay({
      yearElement: navEl.querySelector('.year'),
      monthElement: navEl.querySelector('.month'),
      monthNameElement: navEl.querySelector('.month-name'),
      year: state.year,
      month: state.month,
    });
  };
};
