export const InputValidator = {
  validateFullFilled: (input) => {
    let isFullFilled = true;
    const inputKeys = Object.keys(input);
    inputKeys.map((inputKey) => {
      if (!input[inputKey]) isFullFilled = false;
    });
    return isFullFilled;
  },
  validateFullCorrectType: (input) => {
    const parsedMoney = Number(input.money);
    if (isNaN(parsedMoney) || parsedMoney < 0) {
      return false;
    }
    return true;
  },
};
