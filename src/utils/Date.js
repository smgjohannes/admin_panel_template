import * as moment from 'moment';

export const Date = (date, format = 'MMMM Do YYYY, h:mm:ss a') => {
  return moment(date).format(format);
};
