export const NumberFormatter = {
  parseToCommaNumber: (input) => {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },
  parseToNormalNumber: (input) => {
    return input.replace(/,/g, "");
  },
};
