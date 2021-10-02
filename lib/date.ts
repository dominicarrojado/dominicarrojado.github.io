export function getMonthName(monthIdx: number) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[monthIdx];
}

export function getFormattedDate(dateString: string) {
  const dateObj = new Date(dateString);
  const monthIdx = dateObj.getMonth();

  return `${getMonthName(
    monthIdx
  )} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
}
