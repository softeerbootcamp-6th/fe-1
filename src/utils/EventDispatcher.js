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
    const fitHandlers = this.handlers[eventType];
    for (const key in fitHandlers) {
      const matchedEl = e.target.closest(
        key.includes("#") ? `${key}` : `.${key}`
      );
      if (matchedEl) {
        this.handlers[eventType][key](e);
        break;
      }
    }
  },
};
