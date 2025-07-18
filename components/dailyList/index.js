import { dailyViewChange } from '../../viewHandler/dailyView.js';

export default function initalizeDailyList() {
    const today = new Date().toISOString().split('T')[0];
    const [year, month] = today.split('-');

    dailyViewChange(year, month);
}
