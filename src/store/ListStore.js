import { ListApi } from "../api/ListApi.js";
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
        if (newItem) this.data = newItem;
        this.viewData = this.#getViewDataFromData(this.data);
        break;
      }
      case "addListItem": {
        // optimistic update
        this.data.push(newItem);
        this.viewData = this.#getViewDataFromData(this.data);

        // 서버 반영 시도
        ListApi.postList(newItem).catch((error) => {
          this.data = this.data.filter((item) => item.uid !== newItem.uid);
          this.viewData = this.#getViewDataFromData(this.data);
        });
        break;
      }
      case "updateListItem": {
        // 이전 상태 저장
        const prevItem = this.data.find((item) => item.uid === newItem.uid);

        // 낙관적 업데이트
        this.data = this.data.map((item) =>
          item.uid === newItem.uid ? newItem : item
        );
        this.viewData = this.#getViewDataFromData(this.data);

        // 서버 반영
        ListApi.updateList(newItem.id, newItem).catch((error) => {
          this.data = this.data.map((item) =>
            item.uid === prevItem.uid ? prevItem : item
          );
          this.viewData = this.#getViewDataFromData(this.data);
        });
        break;
      }
      case "removeListItemByUID": {
        // 이전 상태 저장
        const deletedItem = this.data.find((item) => item.uid === newItem);
        console.log(deletedItem);

        // 낙관적 삭제
        this.data = this.data.filter((item) => item.uid !== newItem);
        this.viewData = this.#getViewDataFromData(this.data);

        // 서버 반영

        ListApi.deleteList(deletedItem.id).catch((error) => {
          this.data.push(deletedItem);
          this.viewData = this.#getViewDataFromData(this.data);
        });
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

export const listStore = new ListStore([]);
dateStore.subscribe(() => {
  listStore.dispatch("initListItem");
});
