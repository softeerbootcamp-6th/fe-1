import {
  chartState,
  inputFormState,
  modalState,
  monthState,
  transactionState,
} from "../stores/subjects/index.js";

import {
  TransactionsObserver,
  InputFormObserver,
  CalendarObserver,
  ChartObserver,
  MonthObserver,
  ModalObserver,
} from "../stores/observers/index.js";

import {
  TransactionsView,
  InputFormView,
  CalendarView,
  ChartView,
  ModalView,
} from "../views/index.js";

export const subscribeHomeObserver = () => {
  const inputFormView = new InputFormView();
  const transactionsView = new TransactionsView();

  const inputFormObserver = new InputFormObserver(inputFormView);
  const transactionsObserver = new TransactionsObserver(transactionsView);

  inputFormState.subscribe(inputFormObserver);
  transactionState.subscribe(transactionsObserver);
};

export const subscribeCalendarObserver = () => {
  const calendarView = new CalendarView();
  const calendarObserver = new CalendarObserver(calendarView);
  transactionState.subscribe(calendarObserver);
};

export const subscribeChartObserver = () => {
  const chartView = new ChartView();
  const chartObserver = new ChartObserver(chartView);
  transactionState.subscribe(chartObserver);
  chartState.subscribe(chartObserver);
};

export const subscribeHeaderObserver = () => {
  const monthObserver = new MonthObserver();
  monthState.subscribe(monthObserver);
};

export const subscribeModalObserver = () => {
  const modalView = new ModalView();
  const modalObserver = new ModalObserver(modalView);
  modalState.subscribe(modalObserver);
  modalState.init();
};

export const unsubscribeAll = () => {
  chartState.unsubscribeAll();
  inputFormState.unsubscribeAll();
  monthState.unsubscribeAll();
  transactionState.unsubscribeAll();
};
