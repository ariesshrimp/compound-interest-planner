export const parseDecimal = string =>
  parseFloat(parseFloat(string, 10).toFixed(2), 10);
export const numberWithCommas = num =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
