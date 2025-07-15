// 캘린더 뷰 구현
import { sharedState } from '../state/state.js';
import { currentMonth, currentYear } from './header.js';

export function initCalendarView() {
    renderCalendar(currentYear, currentMonth);
    
    // 캘린더 초기화 후 총액도 업데이트
    import('./calendarTotalAmount.js').then(module => {
        module.updateCalendarTotalAmount();
    });
}

// 캘린더 그리기
function renderCalendar(year, month) {
    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';
    
    // 월의 첫 날과 마지막 날 구하기
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();
    
    // 요일 헤더 추가
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    weekdays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // 첫 날의 요일까지 빈 칸 추가
    const firstDayOfWeek = firstDay.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // 달력 일자 추가
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        
        const calendarDay = document.createElement('div');
        calendarDay.className = `calendar-day ${isWeekend ? 'calendar-weekend' : ''}`;
        
        // 해당 날짜의 데이터 표시
        const entriesContainer = document.createElement('div');
        entriesContainer.className = 'calendar-day-entries';
        
        // 날짜 형식 YYYY-MM-DD 로 포맷팅
        const dateString = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        
        // 해당 날짜의 항목 찾기
        const dayEntries = sharedState.entries.filter(entry => entry.date === dateString);
        
        // 수입과 지출 합계 계산
        let dayIncomeTotal = 0;
        let dayExpenseTotal = 0;
        
        dayEntries.forEach(entry => {
            if (entry.isIncome) {
                dayIncomeTotal += entry.amount;
            } else {
                dayExpenseTotal += entry.amount;
            }
        });
        
        // 수입과 지출 표시
        if (dayIncomeTotal > 0) {
            const incomeElement = document.createElement('div');
            incomeElement.className = 'calendar-income';
            incomeElement.textContent = `수입: ${dayIncomeTotal.toLocaleString()}원`;
            entriesContainer.appendChild(incomeElement);
        }
        
        if (dayExpenseTotal > 0) {
            const expenseElement = document.createElement('div');
            expenseElement.className = 'calendar-expense';
            expenseElement.textContent = `지출: ${dayExpenseTotal.toLocaleString()}원`;
            entriesContainer.appendChild(expenseElement);
        }
        
        // 순서 변경: 엔트리 먼저, 날짜 번호는 나중에
        calendarDay.appendChild(entriesContainer);
        
        // 날짜 헤더
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-number';
        dayHeader.textContent = day;
        calendarDay.appendChild(dayHeader);
        
        calendarGrid.appendChild(calendarDay);
    }
}

// 캘린더 업데이트 함수 - 헤더의 월 변경시 호출
export function updateCalendarView(year, month) {
    renderCalendar(year, month);
    
    // 캘린더 뷰 업데이트 후 총액도 업데이트
    import('./calendarTotalAmount.js').then(module => {
        module.updateCalendarTotalAmount();
    });
}
