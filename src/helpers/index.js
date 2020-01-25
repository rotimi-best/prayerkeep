import global from '../constants/global';

export const getDateCreated = (createdAt) => {
  const date = new Date();
  return `${global.MONTHS.SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

/**
 * Get today's date in string
 * @returns {string} 2018-12-02
 */
export const date = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;
};