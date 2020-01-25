import global from '../constants/global';

export const getDateCreated = (createdAt) => {
  const date = new Date();
  return `${global.MONTHS.SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

/**
 * Get today's date in string
 * @returns {string} 2018-12-02
 */
export const date = ({ toUTC, defDate = null }) => {
  const today = defDate ? defDate : new Date();
  const dateNumber = today.getDate();
  const month = toUTC ? today.getMonth() : today.getMonth() + 1;
  const year = today.getFullYear();

  if (toUTC) {
    return Date.UTC(year, month, dateNumber);
  }

  return `${year}-${month < 10 ? "0" + month : month}-${
    dateNumber < 10 ? "0" + dateNumber : dateNumber
  }`;;
};