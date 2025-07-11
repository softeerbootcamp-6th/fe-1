import initializeHeader from './components/header/index.js';
import { createInputBox } from './components/inputbar/index.js';
import dateData from './store/date.js';

initializeHeader();
createInputBox();

dateData.initDateData();
