import initalizeDailyList from './components/dailyList/index.js';
import initializeHeader from './components/header/index.js';
import initalizeInputBox from './components/inputbar/index.js';
import { dailyData } from './store/daily.js';
import dateData from './store/date.js';

await dailyData.init();
initializeHeader();
initalizeInputBox();
initalizeDailyList();

dateData.initDateData();
