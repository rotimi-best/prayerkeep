export default (xDays) => {
  let nextXDaysDate = new Date();

  if (!xDays) {
    return nextXDaysDate;
  }

  const year = nextXDaysDate.getFullYear();
  const month = nextXDaysDate.getMonth();
  const date = nextXDaysDate.getDate();

  for (let i=0; i < xDays; i++){
    nextXDaysDate = new Date(year, month, date + i);
  }

  return nextXDaysDate;
}
