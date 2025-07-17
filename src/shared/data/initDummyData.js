import {GetDummyData} from "./dummyData.js";

export const initDummyData = ({summaryStore}) => {
    GetDummyData().then(dummy => {
        dummy.forEach(e => {
            summaryStore.dispatch('ENTRY/ADD', e)
        });
    })
}