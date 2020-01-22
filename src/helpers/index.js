import global from '../constants/global';

export const getDateCreated = (createdAt) => {
  const date = new Date();
  return `${global.MONTHS.SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}