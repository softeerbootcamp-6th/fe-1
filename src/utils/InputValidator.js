export const InputValidator = {
  validateFullFilled: (input) => {
    let isFullFilled = true;
    const inputKeys = Object.keys(input);
    inputKeys.map((inputKey) => {
      if (inputKey === "uid") return;
      if (!input[inputKey]) isFullFilled = false;
    });
    return isFullFilled;
  },
  validateFullCorrectType: (input) => {
    const parsedMoney = Number(input.money);
    if (isNaN(parsedMoney) || parsedMoney < 0) {
      alert("금액을 숫자로 작성해주세요!");
      return false;
    }
    return true;
  },
};
