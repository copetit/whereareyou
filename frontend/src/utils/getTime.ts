export const newDate = new Date();
export const nowYear = newDate.getFullYear();
export const nowMonth =
  newDate.getMonth() + 1 < 9
    ? `0${newDate.getMonth() + 1}`
    : newDate.getMonth() + 1;
export const nowDate = newDate.getDate();
