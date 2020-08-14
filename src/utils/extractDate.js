const convertDate = (date, format) => {
  const [year, months] = date.split('-');

  if (format === 'year') {
    return year;
  } else if (format === 'months') {
    return months;
  }

  return date;
}

export { convertDate };