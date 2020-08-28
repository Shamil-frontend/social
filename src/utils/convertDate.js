import format from 'date-fns/format';

const convertDate = (date, dateFormat = 'dd.MM.yyyy') => {
  if (date) {
    return format(new Date(date), dateFormat);
  }

  return date;
};

export default convertDate;