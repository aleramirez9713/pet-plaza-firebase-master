export const formatterHNL = new Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
  minimumFractionDigits: 2,
});

export const formatterUSD = new Intl.NumberFormat("en-US", { 
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

export const formatCurrency = (currency, value = 0) => {
  return `${currency} ${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

export const formatDate = (date) => {
  const getDateFormat = new Date();
  getDateFormat.setTime(date);
  return getDateFormat.toLocaleDateString();
};

