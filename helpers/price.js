export const formatPrice = (value) => {
  const fixedValue = value && Number(value).toFixed(2);

  return fixedValue ?
    fixedValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') :
    fixedValue;
  // пример, на выходе: "1 091.21"
};

export const getCurrentPrice = (product = {}) => {
  const {
    price,
    discountPrice
  } = product;
  return discountPrice === 0 ? price : discountPrice
};

export const getPriceByOffer = (offer, isPharmacist = false) => {
  const {
    priceStoresFrom,
    pharmacistPrice,
    currentPrice,
    isBookingAvailable,
  } = offer;
  if (isBookingAvailable) return priceStoresFrom;
  return isPharmacist ? pharmacistPrice : currentPrice;
};

export const isOfferDiscounted = (offer = {}) => {
  const {
    currentPrice,
    previousPrice
  } = offer;
  if (!currentPrice || !previousPrice) return false;
  const percentage = calculateDiscountPercentage({
    current: currentPrice,
    previous: previousPrice,
  });
  return percentage > 0;
};

export const calculateDiscountPercentage = ({
  current,
  previous
}) => {
  const percent = previous / 100;
  const priceInPercentage = Math.round(current / percent);
  return Math.ceil(100 - priceInPercentage);
};

export const getCardTypes = (cardNumber) => {
  let re = /^4/;
  if (cardNumber === null) return;
  if (cardNumber.match(re) != null) return "visa";

  re = /^(34|37)/;
  if (cardNumber.match(re) != null) return "amex";

  re = /^5[1-5]/;
  if (cardNumber.match(re) != null) return "mastercard";

  re = /^6011/;
  if (cardNumber.match(re) != null) return "discover";

  re = /^9792/
  if (cardNumber.match(re) != null) return 'troy'

  return "visa"; // default type
}

export const generateRandomInt = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
}
