export const padNumber = (number, digits = 2) => {
  if (Number.isInteger(number)) {
    return ('' + number).padStart(digits, '0');
  } else {
    return (number < 10 ? '0' : '') + number;
  }
}
