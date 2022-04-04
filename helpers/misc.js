import { isString } from 'lodash';
import { DEFAULT_PHONE_MASK } from '@/constants';

export const getRawPhoneNumber = (str = '', len = 10) => {
  const strippedNoStart = str.replace(/(^\+7)/, '');
  const strippedStr = strippedNoStart.replace(/\D/gi, '');
  if (strippedStr.length > len) return strippedStr.replace(/(^7|^8)/, '');
  return strippedStr;
};

export const getLoginPhoneNumber = (str = '', len = 10) => {
  if (!isPhoneNumber(str, len)) return str;
  const raw = getRawPhoneNumber(str, len);
  return `7${raw}`;
};

export const isPhoneNumber = (str = '', len = 10) => {
  const rawString = getRawPhoneNumber(str, len);
  return rawString.length === len;
};

export const getFormattedPhoneNumber = (
  str = '',
  mask = DEFAULT_PHONE_MASK,
) => {
  const len = [...mask.matchAll(/[#]/g)].length;
  if (!isPhoneNumber(str, len)) return str;
  const rawArr = [...getRawPhoneNumber(str, len)];
  let result = mask;
  for (let i = 0, rawArrLen = rawArr.length; i < rawArrLen; i += 1) {
    result = result.replace('#', rawArr[i]);
  }
  console.warn({ result });
  return result;
};

export const toPlainPhoneNumber = (phone) =>
  phone?.toString().replace(/\D/g, '');

export function toFormatedPhoneNumber(rawPhone) {
  if (!rawPhone) return rawPhone;

  let phone = toPlainPhoneNumber(rawPhone);

  switch (phone.length) {
    // ##-###-####
    case 8:
    case 9:
    case 10:
      phone = phone.replace(/(\d{2})(\d{3})(\d{1,4})?/, '$1-$2-$3');
      break;

    // ### ###-##-##
    case 11:
      phone = phone.replace(
        /(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/,
        '$1 ($2) $3-$4-$5',
      );
      break;

    // ### ###-###-#########
    default:
      phone = phone.replace(/(\d{3})(\d{3})(\d{3})(\d+)?/, '$1 $2-$3-$4');
  }

  return `+${phone}`;
}

export const replaceMaskSymbols = (str) => {
  if (!str || !isString(str)) {
    return '';
  }

  return str.replace(/[()\-+_ ]/gi, '');
};
