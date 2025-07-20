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

// 이벤트 위임을 사용하여 navEl에 클릭 이벤트 리스너를 추가
const addEventListeners = ({ navEl, headerDateModel, dateStore }) => {
  navEl.addEventListener('click', (event) => {
    // 이전 달 버튼 클릭
    if (event.target.closest('.prev')) {
      navigateToPreviousMonth({ headerDateModel, dateStore });
    }
    // 다음 달 버튼 클릭
    if (event.target.closest('.next')) {
      navigateToNextMonth({ headerDateModel, dateStore });
    }
  });
};

export const initDateNav = ({ navEl, dateStore }) => {
  // 모델 생성
  const headerDateModel = new HeaderDateModel();

  // 이벤트 리스너 등록
  addEventListeners({
    navEl,
    headerDateModel,
    dateStore,
  });

  // render 함수 생성
  const render = createRenderFunction({ navEl });

  // Store 상태 변경 구독
  dateStore.subscribe(render);

  // 초기 상태 설정 및 UI 렌더링
  syncStateToStore({ headerDateModel, dateStore });
  render(dateStore.getState());
};
