import moment from 'moment';

export const getWeekDates = (dateString) => {
  const date = dateString ? moment(dateString, 'YYYY-MM-DD') : moment();
  const weekdaysNumber = [0, 1, 2, 3, 4, 5, 6];
  const year = moment(date).year();
  const weekNumber = moment(date).weekday(1).week();
  return weekdaysNumber.map((day) =>
    moment().year(year).week(weekNumber).weekday(day).format('YYYY-MM-DD')
  );
};
