import { DAYS_OF_WEEK } from './constant.js';

export const formatDate = (date, format) => {
    if (!(date instanceof Date) || isNaN(date)) {
        return date;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1);
    const day = String(date.getDate());

    const dayOfWeek = DAYS_OF_WEEK[date.getDay()];

    switch (format) {
        case 'YYYY-MM-DD':
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        case 'YYYY년 MM월 DD일':
            return `${year}년 ${month.padStart(2, '0')}월 ${day.padStart(
                2,
                '0'
            )}일`;
        case 'M월 D일 ddd':
            return `${month}월 ${day}일 ${dayOfWeek}요일`;
        default:
            return `${year}-${month}-${day}`;
    }
};

export const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const extractNumbersOnly = (str) => {
    return str.replace(/[^0-9]/g, '');
};

export const formatNumberInput = (value) => {
    const numbersOnly = extractNumbersOnly(value);

    if (numbersOnly !== '') {
        return formatNumberWithCommas(parseInt(numbersOnly, 10).toString());
    }

    return '';
};

export const open = (element) => {
    element.style.display = 'block';
};

export const close = (element) => {
    element.style.display = 'none';
};

export const toggle = (element) => {
    element.style.display =
        element.style.display === 'block' ? 'none' : 'block';
};

export function formatMonthName(month) {
    return new Date(2025, month - 1).toLocaleString('en-US', { month: 'long' });
}

export const getUUID = () => {
    return crypto.randomUUID();
};

export const getTotalAmount = (paymentData) => {
    const totalIncome = paymentData.reduce((acc, item) => {
        if (item.amount > 0) {
            return acc + Math.abs(item.amount);
        }
        return acc;
    }, 0);

    const totalExpense = paymentData.reduce((acc, item) => {
        if (item.amount < 0) {
            return acc + Math.abs(item.amount);
        }
        return acc;
    }, 0);

    return { totalIncome, totalExpense };
};

export const groupByDate = (data) => {
    const grouped = data.reduce((acc, item) => {
        const date = item.paidAt.split('T')[0];

        if (!acc[date]) {
            acc[date] = {
                date: date,
                records: [],
            };
        }

        acc[date].records.push(item);
        return acc;
    }, {});

    return Object.values(grouped).sort(
        (a, b) => new Date(b.date) - new Date(a.date)
    );
};

export const filterPaymentData = ({ data, income, expense }) => {
    if (income && expense) {
        return data;
    }

    if (income) {
        return data.filter((item) => item.amount > 0);
    }

    if (expense) {
        return data.filter((item) => item.amount < 0);
    }
    return [];
};

export const isToday = (year, month, date) => {
    const today = new Date();
    return (
        year === today.getFullYear() &&
        month === today.getMonth() + 1 &&
        date === today.getDate()
    );
};
