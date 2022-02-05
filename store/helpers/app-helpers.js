export const setField = (state, payload) => {
  const payloadArr = Array.isArray(payload) ? payload : [payload];
  payloadArr.forEach(({ field, value }) => {
    if (!field) {
      return;
    }
    state[field] = value;
  });
};
