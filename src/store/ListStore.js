import { ListApi } from "../api/ListApi.js";
import { DummyList } from "../mocks/DummyList.js";
import { ListFilter } from "../utils/ListFilter.js";
import { dateStore } from "./DateStore.js";
import { Store } from "./store.js";

class ListStore extends Store {
  constructor(initData) {
    super([...initData]);
    this.moneyTypeFilter = {
      expense: true,
      income: true,
    };
    this.viewData = this.#getViewDataFromData([...initData]);
    console.log(this.data);
    console.log(this.viewData);
  }

  #getViewDataFromData(data) {
    const { year, month } = dateStore.data;
    const monthData = ListFilter.groupTransactionsByMonth(data, {
      year,
      month,
    });
    const filterdMonthData = ListFilter.groupTransactionsByMoneyType(
      monthData,
      this.moneyTypeFilter
    );
    return filterdMonthData;
  }

  dispatch(type, newItem) {
    switch (type) {
      case "initListItem": {
        this.moneyTypeFilter = {
          expense: true,
          income: true,
        };
        if (newItem) this.data = [...newItem];
        this.viewData = this.#getViewDataFromData(this.data);
        break;
      }
      case "addListItem": {
        this.data.push(newItem);
        this.viewData = this.#getViewDataFromData(this.data);
        break;
      }
      case "updateListItem": {
        this.data = this.data.map((item) =>
          item.uid === newItem.uid ? newItem : item
        );
        this.viewData = this.#getViewDataFromData(this.data);
        break;
      }
      case "removeListItemByUID": {
        this.data = this.data.filter((item) => item.uid !== newItem);
        this.viewData = this.#getViewDataFromData(this.data);
        break;
      }
      case "filterList": {
        if (newItem === "income") {
          this.moneyTypeFilter.income = !this.moneyTypeFilter.income;
        } else {
          this.moneyTypeFilter.expense = !this.moneyTypeFilter.expense;
        }
        this.viewData = this.#getViewDataFromData(this.data);
        console.log(this.moneyTypeFilter);
        break;
      }
    }
    this.notify("viewData");
  }
}

export const listStore = new ListStore(DummyList);
// ListApi.getList().then((data) => {
//   if (data) {
//     listStore.dispatch("initListItem", data);
//   }
// });
dateStore.subscribe(() => {
  listStore.dispatch("initListItem");
});
