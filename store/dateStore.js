let year = null;
let month = null;

const initDateData = () => {
    const today = new Date();
    year = today.getFullYear();
    month = today.getMonth() + 1;
};

const changeMonth = (offset) => {
    month += offset;

    if (month > 12) {
        month = 1;
        year += 1;
    } else if (month < 1) {
        month = 12;
        year -= 1;
    }
};

const increaseMonth = () => {
    changeMonth(1);
};

const decreaseMonth = () => {
    changeMonth(-1);
};

const getCurrentDate = () => {
    return { year, month };
};

// 단일 객체를 export해서 싱글톤으로 사용
const dateStore = {
    initDateData,
    increaseMonth,
    decreaseMonth,
    getCurrentDate
};

export default dateStore;
