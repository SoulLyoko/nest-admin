import * as Dayjs from 'dayjs';

export const dayjs = Dayjs;

/**
 *
 * @param date 日期
 * @param format 格式 'date' | 'time' | 'datetime' | string(eg:'YYYY-MM-DD HH:mm:ss')
 */
export const formatDate = (date = new Date(), format: 'date' | 'time' | 'datetime' | string = 'datetime') => {
  switch (format) {
    case 'date':
      return dayjs(date).format('YYYY-MM-DD');
    case 'time':
      return dayjs(date).format('HH:mm:ss');
    case 'datetime':
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
    default:
      return dayjs(date).format(format);
  }
};
