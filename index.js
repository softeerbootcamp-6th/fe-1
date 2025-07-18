import initalizeDailyList from './components/dailyList/index.js';
import initializeHeader from './components/header/index.js';
import initalizeInputBox from './components/inputbar/index.js';
import { dailyData } from './store/daily.js';
import dateData from './store/date.js';
import { dateViewChange } from './viewHandler/dateView.js';

await dailyData.init();

document.getElementById('header-placeholder').append(initializeHeader());
initalizeInputBox();
initalizeDailyList();

dateData.initDateData();
dateViewChange(dateData.year, dateData.month);
