import { Store } from './store.js';
import { initDateNav } from '../domains/calendar/ui/dateNav.js';
import { initSummaryView } from '../domains/summary/ui/summaryView.js';
import { initFormView } from '../domains/entryForm/ui/formView.js';
import { loadDummyData } from '../shared/data/dummyData.js';

const bootstrap = () => {
    // Store 생성
    const store = new Store({ entries: [] });

    // 날짜쪽 UI 초기화
    initDateNav({ navEl: document.querySelector('.month-nav') });
    // 달별 가계부 UI 초기화
    initSummaryView({ summaryEl: document.querySelector('.month-summary'), store });
    // 입력폼 UI 초기화
    initFormView({ formEl: document.querySelector('.detail-form'), store });

    // 더미 데이터를 비동기(Promise) 방식으로 로드 후 스토어에 주입
    loadDummyData()
        .then(dummy => {
            dummy.forEach(e => store.dispatch('ENTRY/ADD', e));
        });
};

document.addEventListener('DOMContentLoaded', bootstrap);
