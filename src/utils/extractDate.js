const extractDate = (date, format) => {
  const [year, months, day] = date.split('-');

  if (format === 'year') {
    return year;
  } else if (format === 'months') {
    return months;
  } else if (format === 'day') {
    return day;
  }
  return date;
}

export default extractDate;