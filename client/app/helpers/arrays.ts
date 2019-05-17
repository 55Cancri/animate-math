// helper array methods

// get a random item from an array
export const getRandomItem = array => array[(array.length * Math.random()) | 0];

// create an array by giving it a number
export const makeArray = (size: number, placeholder = 0): any[] => {
  if (typeof size !== "number") {
    throw new Error(`Please pass a valid number. ${size} was not a number!`);
  }

  return [...new Array(size)].map(() => placeholder);
};

// shuffle an array
export const shuffle = array =>
  // eslint-disable-next-line fp/no-mutating-methods
  array
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
