import {GetDummyData} from "../shared/data/dummyData.js";

export const initDummyData = ({summaryStore}) => {
    GetDummyData().then(dummy => {
        dummy.forEach(e => {
            summaryStore.dispatch('ENTRY/ADD', e)
        });
    })
}