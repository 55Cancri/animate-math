// random assortment of miscellaneous helper functions

export const sleep = (milliseconds: number): Promise<any> =>
  new Promise(resolve => setTimeout(resolve, milliseconds));

// get a query fragment from the url
export const getQueryParameter = (fragment: string): string => {
  // extract url params into an array
  const urlParams = new URLSearchParams(window.location.search);

  // otherwise return just the requested parameter
  const [parameter] = urlParams.getAll(fragment);
  return parameter;
};

export const log = (title: string, data: any, display?: string): void => {
  if (display === 'table') {
    console.log(title);
    return console.table(data);
  }
  console.log(title);
  return console.log(data);
};
