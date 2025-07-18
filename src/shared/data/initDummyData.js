import { getDummyData } from './dummyData.js';

export const initDummyData = ({ summaryStore }) => {
  getDummyData().then((dummy) => {
    dummy.forEach((e) => {
      summaryStore.dispatch('ENTRY/ADD', e);
    });
  });
};
