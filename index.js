// DOMContent가 로드된 후에 실행됨
document.addEventListener('DOMContentLoaded', () => {

    // *****
    // ***** header 부분 코드 *****
    // *****

    const monthList = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];

    // 클래스이름으로 html 요소를 선택함, month-nav 클래스의 첫번째 요소를 선택(하나만 존재하긴 함)
    const monthNav = document.getElementsByClassName('month-nav')[0];

    // 쿼리셀렉터를 사용하여 year, month, month-name 클래스를 가진 요소들을 선택
    let year = monthNav.querySelector('.year').textContent; // 초기 연도 설정
    let month = monthNav.querySelector('.month').textContent; // 초기 월 설정
    let monthName = monthNav.querySelector('.month-name').textContent; // 초기 월 이름 설정

    // 현재 날짜를 불러오고 표시하는 함수
    const setCurrentDate = () => {
        // 현재 날짜를 가져옴
        const today = new Date();
        // 현재 날짜로 업데이트
        year = today.getFullYear();
        // 월은 0부터 시작하므로 +1을 해줌
        month = today.getMonth() + 1;
        // 월 이름을 가져와서 표시, 영어로 표시, toLocaleString에서 month만 가져옴
        monthName = today.toLocaleString('en-US', { month: 'long' });
    };

    // 날짜 표시창에 현재 날짜를 업데이트하는 함수
    const updateDateDisplay = () => {
        monthNav.querySelector('.year').textContent = year;
        monthNav.querySelector('.month').textContent = month;
        monthNav.querySelector('.month-name').textContent = monthName;
    };

    setCurrentDate();
    updateDateDisplay();

    const prevBtn = monthNav.querySelector('.prev'); // 이전 버튼
    const nextBtn = monthNav.querySelector('.next'); // 다음 버튼

    prevBtn.addEventListener('click', () => {
        // 이전 버튼 클릭 시
        month -= 1;
        if (month < 1) {
            month = 12;
            year -= 1;
        }
        monthName = monthList[month - 1];
        updateDateDisplay();
    });

    nextBtn.addEventListener('click', () => {
        // 다음 버튼 클릭 시
        month += 1;
        if (month > 12) {
            month = 1;
            year += 1;
        }
        monthName = monthList[month - 1];
        updateDateDisplay();
    });

    // *****
    // ***** form 부분 코드 *****
    // *****

    const form = document.getElementsByClassName('detail-form')[0];
    const formDate = form.querySelector('#form-date');

    // detail-form의 날짜 입력 필드 설정
    const setDetailFormDate = () => {
      // 오늘 날짜를 YYYY-MM-DD 형식으로 설정
      const today = new Date();
      formDate.value = today.toISOString().split('T')[0];
    };
    setDetailFormDate();

    const formSign = form.querySelector('#form-sign');

    let sign = formSign.textContent; // 초기 기호 설정

    formSign.addEventListener('click', () => {
        // 기호 클릭 시
        sign = (sign === '-') ? '+' : '-'; // 기호를 토글
        formSign.textContent = sign; // 기호 업데이트
    });



});