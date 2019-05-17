// helper functions used to generate random data

import { makeArray } from "./arrays";

// randomly generate a number
// higher threshold results in greater chance of getting 0
export const randomNumber = (
  min: number,
  max: number,
  threshold: number = 0
): number => {
  //  random number between min (inclusive) and max (exclusive)
  const randomNumberInRange: number = Math.random() * (max - min) + min;

  // range [0, 1)
  const randomDecimal: number = Math.random();

  // return either 0 or random number
  return randomDecimal <= threshold ? 0 : Math.round(randomNumberInRange);
};

// randomly generate true or false
export const randomBoolean = (): boolean => {
  const number = randomNumber(0, 1);
  return number === 1;
};

// return a random grade level
export const randomGrade = () => {
  const grades = ["12", "11", "10", "9", "8", "7"];
  const index = randomNumber(0, grades.length - 1);
  // eslint-disable-next-line security/detect-object-injection
  return grades[index];
};

// randomly generate a uuid
export const generateUuid = () => {
  // use high-precision timer if available
  const highPrecisionTimer = () =>
    typeof performance !== "undefined" && typeof performance.now === "function"
      ? performance.now()
      : 0;

  // divide initial millisecond date by 16 some x number of times
  const divideDate = (date: number, i: number): number =>
    makeArray(i).reduce(
      (store: number): number => Math.floor(store / 16),
      Number(date)
    );

  // create return the uuid
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (char: string, i: number): string => {
      const precisionTime = new Date().getTime() + highPrecisionTimer();
      const date = i === 0 ? precisionTime : divideDate(precisionTime, i);
      // eslint-disable-next-line no-bitwise
      const r = (date + Math.random() * 16) % 16 | 0;
      // eslint-disable-next-line no-bitwise
      return (char === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
};
