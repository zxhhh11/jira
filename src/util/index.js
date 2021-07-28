export const isFalse = (value) => (value === 0 ? false : !value); //!!value  是指求value得布尔值

export const cleanObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalse(value)) {
      delete result[key];
    }
  });
  return result;
};
