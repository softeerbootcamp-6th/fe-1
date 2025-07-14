export const addCommaFormatter = (inp) => 
    // 금액 입력 필드에 숫자만 입력받고 3자리마다 콤마를 추가하는 포맷터
    // input 이벤트를 사용하여 사용자가 입력할 때마다 값을 업데이트
    inp.addEventListener('input', e => { 
        e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
    });
