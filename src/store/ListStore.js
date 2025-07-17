import { DummyList } from "../mocks/DummyList.js";
import { ListFilter } from "../utils/ListFilter.js";
import { dateStore } from "./DateStore.js";
import { Store } from "./store.js";

class ListStore extends Store {
  constructor(initData) {
    super(initData);
    this.originData = [...initData]; //원본+화면에 나타내지 않는 요소
    this.moneyTypeFilter = {
      expense: true,
      income: true,
    };
  }

  // dispatcher 패턴으로 render 함수 호출하여 실행
  dispatch(type, newItem) {
    switch (type) {
      case "addListItem":
        this.originData.push({
          ...newItem,
          uid: crypto.randomUUID(),
        });
        this.originData = this.originData.sort((a, b) => b.date - a.date);
        this.data = [...this.originData];
        break;
      case "removeListItemByUID":
        this.originData = this.originData.filter(
          (partData) => partData.uid !== newItem
        );
        this.data = [...this.originData];
        break;
      case "filterList":
        if (newItem === "income") {
          this.moneyTypeFilter.income = !this.moneyTypeFilter.income;
        } else {
          this.moneyTypeFilter.expense = !this.moneyTypeFilter.expense;
        }
        this.data = ListFilter.groupTransactionsByMoneyType(
          this.originData,
          this.moneyTypeFilter
        );
        break;
    }
    console.log(this.data);
    this.notify();
  }
}

const groupedListByMonth = ListFilter.groupTransactionsByMonth(DummyList, {
  year: dateStore.data.year,
  month: dateStore.data.month,
});
export const listStore = new ListStore(groupedListByMonth);
