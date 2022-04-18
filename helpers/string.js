export const plural = (number, one, two, five) => {
  if (number === 0) return `0 ${five}`;
  // plural(10, 'носок', 'носка', 'носков') --> '10 носков'
  let n = Math.abs(number);

  n %= 100;
  if (n >= 5 && n <= 20) {
    return `${number} ${five}`;
  }

  n %= 10;
  if (n === 1) {
    return `${number} ${one}`;
  }

  if (n >= 2 && n <= 4) {
    return `${number} ${two}`;
  }

  return `${number} ${five}`;
};

export const pluralProducts = (number) =>
  plural(number, 'товар', 'товара', 'товаров');

export const maskCardNumber = (str) => {
  if (!str) return
  const strWithoutSpaces = str.replace(/\s/g, '')
  return strWithoutSpaces.substring(0,4) + '#'.repeat(Math.max(0, strWithoutSpaces.length - 8)) + strWithoutSpaces.substr(-4)
}

export const convertDate = (string) => {
  const month = string.substring(0, 2);
  const year = string.substring(string.length - 2)
  const dateString = `${'20' + year }` + '-' + `${month + '-31'}`
  const date = new Date(dateString)
  return date
}