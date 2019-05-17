// helper functions to work with objects

/* eslint-disable no-prototype-builtins, security/detect-object-injection, no-undef */
// check if a variable is an object
export const isObject = <T>(item: T): boolean =>
  typeof item === 'object' && !Array.isArray(item) && item !== null;

// check if the object is empty
export const isObjectEmpty = (obj): boolean =>
  isObject(obj) && Object.entries(obj).length === 0 && obj.constructor === Object;

// deeply compare two objects
export const areObjectsEqual = (obj1, obj2) => {
  // check for obj2 overlapping props
  if (!Object.keys(obj2).every(key => obj1.hasOwnProperty(key))) return false;

  // check if every key is the same
  return Object.keys(obj1).every(key => {
    // if object
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      // recursively check
      return areObjectsEqual(obj1[key], obj2[key]);
    }

    // do the normal compare
    return obj1[key] === obj2[key];
  });
};
