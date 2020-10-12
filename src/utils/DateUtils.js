export const calcDueDate = (startDateString, frequency) => {
  const start = new Date(startDateString);
  const now = new Date();
  let result = start;

  // Check if the start date is in the past
  if (start < now) {
    const months = calcMonthDiff(now, start);
    const monthsInFuture = Math.abs(((months % frequency) - 1) * frequency);
    result = new Date(start.setMonth(start.getMonth() + monthsInFuture));
  }

  return result.toString();
};

export const calcMonthDiff = (date1, date2) => {
  let months =
    (date1.getFullYear() - date2.getFullYear()) * 12 +
    date1.getMonth() -
    date2.getMonth();
  return months <= 0 ? 0 : months;
};
