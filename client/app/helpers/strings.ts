// helper functions for working with strings

// split up text > 200 into an array of strings < 200
export const splitText = (text: string, len: number): string[] => {
  // array that will contain split text
  let strings = [];
  // while the text is still larger than the character limit (200)
  while (text.length > len) {
    // get the index of the last space within the character limit (200)
    let indexOfLastSpace = text.substring(0, len).lastIndexOf(" ");
    // if the index of the last space is 0, set it to the limit (200)
    indexOfLastSpace = indexOfLastSpace <= 0 ? len : indexOfLastSpace;
    // then add it to the array of parsed strings
    strings = [...strings, text.substring(0, indexOfLastSpace)];
    // get the space immediately after the last string and use as the starting point
    let indexOfNextStartingPoint = text.indexOf(" ", indexOfLastSpace) + 1;
    // seems to account for edge cases...?
    if (
      indexOfNextStartingPoint < indexOfLastSpace ||
      indexOfNextStartingPoint > indexOfLastSpace + len
    )
      indexOfNextStartingPoint = indexOfLastSpace;
    // shorten text body to equal remaining
    text = text.substring(indexOfNextStartingPoint);
  }
  strings = [...strings, text];
  return strings;
};

const punctRegex = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/g;

export const removePunctuation = (word: string): string =>
  word && word.replace(punctRegex, "");

// capitalize a single word: loan -> Loan
export const capitalize = (s: string): string =>
  s && s[0].toUpperCase() + s.slice(1);

// camel case a dashed variable: loaned-tests -> loanedTests
export const camelCase = (variable: string) => {
  // early exist if function was not given a string
  if (!variable) return false;

  // spit the words based on dashes: loaned-tests -> ['loaned', 'tests']
  const words = variable.split("-");

  // format the string passed in
  return words.reduce((store, word: string, i: number): string => {
    // titlecase every subsequent word in words array
    if (i !== 0) return store + capitalize(word);
    console.log("h");
    return store;
  }, "");
};
