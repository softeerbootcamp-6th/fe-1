import initializeHeader from './components/header/index.js';
import initalizeInputBox from './components/inputbar/index.js';
import dateData from './store/date.js';

initializeHeader();
initalizeInputBox();

dateData.initDateData();
