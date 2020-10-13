export const calcDueDate = (startDateString, frequency) => {
  const start = new Date(startDateString);
  const now = new Date();
  let result = start;

  // Check if the start date is in the past
  if (start < now) {
    const month = monthDiff(now, start);
    const monthInFuture = month + frequency - (month % frequency);
    result = new Date(start.setMonth(start.getMonth() + monthInFuture));
  }

  return result.toString();
};

export const monthDiff = (date1, date2) => {
  return (
    (date1.getFullYear() - date2.getFullYear()) * 12 +
    date1.getMonth() -
    date2.getMonth()
  );
};
