export const padNumber = (number, digits = 2) => {
  if (Number.isInteger(number)) {
    return ('' + number).padStart(digits, '0');
  } else {
    return (number < 10 ? '0' : '') + number;
  }
}

export const formatTime = (time) => {
  let remainingTime = time/1000;
  const hr = Math.floor(remainingTime / 3600);
  remainingTime = remainingTime - hr * 3600;

  const min = Math.floor(remainingTime / 60);
  remainingTime = remainingTime - min * 60;

  const sec = remainingTime;
  return padNumber(hr, 2) + ":" + padNumber(min, 2) + ":" + padNumber(sec.toFixed(3), 2);
}
