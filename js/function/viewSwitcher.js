// 뷰 전환 관리 모듈
import { sharedState } from '../state/state.js';
import { initCalendarView } from './calendarView.js';
import { initStatsView } from './statsView.js';

export function initViewSwitcher() {
    // 헤더의 버튼 요소 가져오기
    const viewButtons = document.querySelectorAll('.view-options .icon-btn');
    
    // 각 뷰 요소 가져오기
    const ledgerView = document.getElementById('ledger-view');
    const calendarView = document.getElementById('calendar-view');
    const statsView = document.getElementById('stats-view');
    
    // 현재 활성화된 뷰 상태 설정 (초기값: 가계부)
    sharedState.activeView = 'ledger';
    
    // 뷰 전환 함수
    function switchView(viewName) {
        // 이전 활성화 뷰 비활성화
        document.querySelector('.view.active-view').classList.remove('active-view');
        
        // 새 뷰 활성화
        switch (viewName) {
            case 'ledger':
                ledgerView.classList.add('active-view');
                break;
            case 'calendar':
                calendarView.classList.add('active-view');
                // 캘린더 뷰가 처음 활성화될 때 초기화
                if (!sharedState.calendarInitialized) {
                    initCalendarView();
                    sharedState.calendarInitialized = true;
                }
                break;
            case 'stats':
                statsView.classList.add('active-view');
                // 통계 뷰가 처음 활성화될 때 초기화
                if (!sharedState.statsInitialized) {
                    initStatsView();
                    sharedState.statsInitialized = true;
                }
                break;
        }
        
        // 상태 업데이트
        sharedState.activeView = viewName;
    }
    
    // 버튼 클릭 이벤트 처리
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // 이미 활성화된 버튼이면 무시
            if (button.classList.contains('active')) return;
            
            // 모든 버튼 비활성화
            viewButtons.forEach(btn => btn.classList.remove('active'));
            
            // 클릭된 버튼 활성화
            button.classList.add('active');
            
            // 인덱스에 따라 뷰 전환
            const views = ['ledger', 'calendar', 'stats'];
            switchView(views[index]);
        });
    });
}
