export const formatPrice = (value) => {
  const fixedValue = value && Number(value).toFixed(2);

  return fixedValue
    ? fixedValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
    : fixedValue;
  // пример, на выходе: "1 091.21"
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
  const { currentPrice, previousPrice } = offer;
  if (!currentPrice || !previousPrice) return false;
  const percentage = calculateDiscountPercentage({
    current: currentPrice,
    previous: previousPrice,
  });
  return percentage > 0;
};

export const calculateDiscountPercentage = ({ current, previous }) => {
  const percent = previous / 100;
  const priceInPercentage = Math.round(current / percent);
  return Math.ceil(100 - priceInPercentage);
};
