import { sharedState } from "../../../store/state.js";
import { updateTotalAmounts } from "../components/totalAmount/totalAmount-util.js";
import { getDateFromServer } from "../../pages/main/ledger/entries/entry-util.js";
import { loadEntriesFromServer } from "../api.js";

const entries = sharedState.entries;

/* 
    서버에서 데이터를 받아온 후에 entries에 저장하고
    totalAmount를 업데이트하는 함수
    이 함수는 페이지가 로드될 때 호출되어야 한다.

    서버에서 가져온 데이터가 없다면 수입 지출액을 0으로 초기화 한다.
*/
export async function loadDummyEntries(currentDate) {
  const entriesFromServer = await loadEntriesFromServer(currentDate);

  if (entriesFromServer.length === 0) {
    sharedState.totalExpense = 0;
    sharedState.totalIncome = 0;
    updateTotalAmounts();
    return;
  } else {
    pushEntries(entriesFromServer);
    updateTotalAmounts();
  }
}

function pushEntries(entriesFromServer) {
  entriesFromServer.forEach((entry) => {
    getDateFromServer(entry);
    entries.push(entry);
  });
}
