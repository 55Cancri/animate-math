// this file takes all the exports from the other helper files and exports them here
// this makes them visible not just from their specific files, from this folder as well
// instead of import { capitalize } from '@helpers/strings',
// other files can use import { capitalize }  from '@helpers'

// helper functions for strings
export { splitText, removePunctuation, capitalize, camelCase } from "./strings";

// helper functions for arrays
export { getRandomItem, shuffle, makeArray } from "./arrays";

// helper functions for objects
export { isObject, isObjectEmpty, areObjectsEqual } from "./objects";

// helper functions for miscellaneous functions
export { log, sleep, getQueryParameter } from "./unicorns";

// helper functions for randomly generating data
export {
  randomNumber,
  randomBoolean,
  randomGrade,
  generateUuid
} from "./wildcards";

// adminIs,
// formatToURL,
// tallyArrayProperty
