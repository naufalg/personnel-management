export const convertDateDDMMYY = (input) => {
  let date = new Date(input);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let dt = date.getDate();

  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }

  return dt + '-' + month + '-' + year;
};
