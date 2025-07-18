import createCalendar from '../components/Calendar/index.js';
import createTotalAmountInfo from '../components/TotalAmountInfo/index.js';

export function createCalendarPage() {
    const calendar = createCalendar();
    const totalAmountInfo = createTotalAmountInfo();

    return [calendar, totalAmountInfo];
}
