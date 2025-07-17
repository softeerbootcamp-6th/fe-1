import { HeaderDateModel } from '../model/headerDateModel.js';
import { createRenderFunction } from '../util/viewRenderers.js';

// 상태를 Store로 동기화하는 함수
const syncStateToStore = ({ headerDateModel, dateStore }) => {
  const { year, month } = headerDateModel.get();
  dateStore.dispatch('DATE/SET', { year, month });
};

// 이전 달로 이동
const navigateToPreviousMonth = ({ headerDateModel, dateStore }) => {
  headerDateModel.shift(-1);
  syncStateToStore({ headerDateModel, dateStore });
};

// 다음 달로 이동
const navigateToNextMonth = ({ headerDateModel, dateStore }) => {
  headerDateModel.shift(1);
  syncStateToStore({ headerDateModel, dateStore });
};

const addEventListeners = ({
  prevButton,
  nextButton,
  headerDateModel,
  dateStore,
}) => {
  prevButton.addEventListener('click', () =>
    navigateToPreviousMonth({ headerDateModel, dateStore }),
  );
  nextButton.addEventListener('click', () =>
    navigateToNextMonth({ headerDateModel, dateStore }),
  );
};

export const initDateNav = ({ navEl, dateStore }) => {
  // 모델 생성
  const headerDateModel = new HeaderDateModel();

  // 이벤트 리스너 등록
  addEventListeners({
    prevButton: navEl.querySelector('.prev'),
    nextButton: navEl.querySelector('.next'),
    headerDateModel,
    dateStore,
  });

  // render 함수 생성
  const render = createRenderFunction(navEl);

  // Store 상태 변경 구독
  dateStore.subscribe(render);

  // 초기 상태 설정 및 UI 렌더링
  syncStateToStore({ headerDateModel, dateStore });
  render(dateStore.getState());
};
