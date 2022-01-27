const formatNumber = (number) => (number < 9 ? `0${number}` : number);

const formatDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  return `${year}-${formatNumber(month)}-${formatNumber(day)}`;
};

const getFirstDayOfCurrentWeek = () => {
  const d = new Date();
  d.setUTCHours(12, 0, 0, 0);
  const day = d.getDay();
  const diff = d.getDate() - day + (day == 0 ? -6 : 1);
  return formatDate(new Date(d.setDate(diff)));
};

const getLastDayOfCurrentWeek = () => {
  const date = new Date(getFirstDayOfCurrentWeek());
  date.setDate(date.getDate() + 6);
  return formatDate(date);
};

module.exports = { getFirstDayOfCurrentWeek, getLastDayOfCurrentWeek };
