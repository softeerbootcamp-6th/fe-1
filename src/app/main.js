import {Store} from './store.js';
import {initDateNav} from '../domains/headerDate/ui/dateNav.js';
import {initSummaryView} from '../domains/summary/ui/summaryView.js';
import {initFormView} from '../domains/entryForm/ui/formView.js';
import {initDummyData} from "./initDummyData.js";

const bootstrap = () => {
    // Store 생성
    const summaryStore = new Store({entries: []});
    const dateStore = new Store({year: 2000, month: 9});
    const selectedEntryStore = new Store({selectedEntry: null});

    // 날짜쪽 UI 초기화
    initDateNav({navEl: document.querySelector('.month-nav'), dateStore: dateStore});
    // 월별 가계부 UI 초기화
    initSummaryView({
        summaryEl: document.querySelector('.month-summary'),
        summaryStore: summaryStore,
        dateStore: dateStore,
        selectedEntryStore: selectedEntryStore
    });
    // 입력폼 UI 초기화
    initFormView({
        formEl: document.querySelector('.detail-form'),
        summaryStore: summaryStore,
        selectedEntryStore: selectedEntryStore
    });

    // 더미 데이터를 비동기(Promise) 방식으로 로드 후 스토어에 주입
    initDummyData({summaryStore});
};

document.addEventListener('DOMContentLoaded', bootstrap);
