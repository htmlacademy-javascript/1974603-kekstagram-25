const getRandomPositiveInteger = (minIndex, maxIndex) => {
  const lower = Math.ceil(Math.min(Math.abs(minIndex), Math.abs(maxIndex)));
  const upper = Math.floor(Math.max(Math.abs(minIndex), Math.abs(maxIndex)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const lengthString=(checkString, maxLength) => checkString <= maxLength;
lengthString();
export {getRandomPositiveInteger,getRandomArrayElement};
