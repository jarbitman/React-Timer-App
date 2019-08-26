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
  return padNumber(hr, 2) + ":" + padNumber(min, 2) + ":" + ((Number.isInteger(sec)) ? padNumber(sec, 2) : padNumber(sec.toFixed(3), 2));
}

export const toHMS = (sec) => {
  let remainingSeconds = sec;
  const hours = Math.floor(remainingSeconds / 3600);
  remainingSeconds = remainingSeconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return {
    hours: hours,
    minutes: minutes,
    seconds: remainingSeconds
  }
}

export const removeNonNumeric = (value) => {
  const returnValue = value.split('').filter((c) => c >= '0' && c <= '9').join('');
  return (returnValue === '') ? 0 : returnValue;
}

export const formatDateTime = (dateTimeFormat, currDateTime) => {
  const dateFields = {
    'MM': padNumber(currDateTime.getMonth() + 1),
    'M': currDateTime.getMonth() + 1,
    'DD': padNumber(currDateTime.getDate()),
    'D': currDateTime.getDate(),
    'YYYY': currDateTime.getFullYear(),
    'YY': currDateTime.getFullYear() - 2000,
    'hh': padNumber(currDateTime.getHours()),
    'h': currDateTime.getHours(),
    'i': (currDateTime.getHours() > 12) ? currDateTime.getHours() % 12 : currDateTime.getHours(),
    'I': padNumber((currDateTime.getHours() > 12) ? currDateTime.getHours() % 12 : currDateTime.getHours(), 2),
    'mm': padNumber(currDateTime.getMinutes()),
    'm': currDateTime.getMinutes(),
    'ss': padNumber(currDateTime.getSeconds()),
    's': currDateTime.getSeconds(),
    'a': (currDateTime.getHours() < 12) ? 'am' : 'pm',
    'A': (currDateTime.getHours() < 12) ? 'AM' : 'PM',
  }

  let formattedDateTime = dateTimeFormat.replace(/([a-zA-Z]+)/g, (field) => {
    if (typeof(dateFields[field]) !== 'undefined') {
      return dateFields[field];
    } else {
      return field;
    }
  });

  return formattedDateTime;
}
