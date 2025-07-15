import { items as DummyItems } from "./constants/items.js";
import { getDateYMD } from "./utils/date.js";

const observers = new Set();

/* */
function addObservers(observer) {
  observers.add(observer);
}

function notifyObservers(data) {
  observers.forEach((observer) => observer(data));
}

function setState(newState) {
  Object.assign(state, newState);
}

const state = new Proxy(
  {
    items: DummyItems, // transaction list
    curDate: getDateYMD(new Date()),
    navBarState: "메인",
  },
  {
    set: (target, prop, value) => {
      target[prop] = value;
      notifyObservers({ [prop]: value }); // key 전달
      return true;
    },
  }
);

export { state, setState, addObservers };
