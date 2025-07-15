export const EventDispatcher = {
  handlers: {
    click: {},
    input: {},
  },

  register({ eventType, selector, handler }) {
    this.handlers[eventType][selector] = handler;
  },

  dispatch(e) {
    const eventType = e.type;
    console.log(eventType);
    const fitHandlers = this.handlers[eventType];
    console.log(fitHandlers);
    for (const key in fitHandlers) {
      const matchedEl = e.target.closest(`.${key}`);
      if (matchedEl) {
        this.handlers[eventType][key](e);
        break;
      }
    }
  },
};
