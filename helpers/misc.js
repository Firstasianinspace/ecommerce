import { DEFAULT_PHONE_MASK } from './constants';

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
