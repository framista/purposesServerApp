const formatDate = (date) => new Date(date).toISOString().slice(0, 10);

const getFirstDayOfCurrentWeek = () => {
  const curr = new Date();
  const first = curr.getDate() - curr.getDay();
  const firstday = new Date(curr.setDate(first)).toUTCString();
  return formatDate(firstday);
};

const getLastDayOfCurrentWeek = () => {
  const curr = new Date();
  const first = curr.getDate() - curr.getDay();
  const last = first + 6;
  const lastday = new Date(curr.setDate(last)).toUTCString();
  return formatDate(lastday);
};

module.exports = { getFirstDayOfCurrentWeek, getLastDayOfCurrentWeek };
