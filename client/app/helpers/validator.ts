// exports a validator object that currently only validates the contact information

import re from "./regex";

// error messages to be displayed on ui
const errorMessages = {
  // firstName or lastName
  names: (key, value) => ({
    mustNotBeEmpty: `${key} name is required.`,
    mustBeAlphaNumeric: `${value} must consist of alphanumeric characters, space, single quote, or dash, however, it cannot begin or end with a space, single quote, or a dash and it cannot consist of two non-alphanumeric characters together.`
  }),
  email: () => ({
    mustNotBeEmpty: "Email is required.",
    mustBeFormatted:
      "Your email address must contain at least 1 character before the @ symbol, a period, and 2-4 characters after the period."
  }),
  jobTitle: () => ({
    mustNotBeEmpty: "Job title is required."
  }),
  PONumber: () => ({
    mustBeAlphaNumberic:
      "Purchase Order Number only allows alpha numeric characters and the special characters: space ,  / - _ : ' # . $"
  })
};

// validation functions
const validateName = (key: any, value: any) => {
  if (
    (key === "firstName" && value.length < 50) ||
    (key === "lastName" && value.length < 50) ||
    (key === "email" && value.length < 100)
  ) {
    // initialize first name / last name error messages
    const messages = errorMessages.names(key, value);

    // return message if the name value is empty
    if (value === "") {
      return messages.mustNotBeEmpty;
    }

    // return message if the name value is not alphanumeric
    if (Boolean(value.match(re.string)) === false) {
      return messages.mustBeAlphaNumeric;
    }
  }

  // otherwise return no error message
  return "";
};

const validateEmail = (email: string) => {
  // initialize email error messages
  const messages = errorMessages.email();
  // if (email === undefined) {
  //   return;
  // }

  // set error message if the email is empty
  if (email === "") {
    return messages.mustNotBeEmpty;
  }
  // set error message if the email is improperly formatted
  if (Boolean(email.match(re.email)) === false) {
    return messages.mustBeFormatted;
  }

  // otherwise return no error message
  return "";
};

const validateJobTitle = (jobTitle: string) => {
  // initialize job title error messages
  const messages = errorMessages.jobTitle();

  // return message if the name value is empty
  if (jobTitle === "0") {
    return messages.mustNotBeEmpty;
  }

  // otherwise return no error message
  return "";
};

const validatePONumber = (PONumber: string) => {
  // initialize po number error messages
  const messages = errorMessages.PONumber();

  // extract piecemeal regex to validate the po number
  const { beginningNumber, middleNumber, endNumber, doubleNumber } = re.numbers;

  // return message if the name value is empty
  if (
    PONumber !== "" &&
    (Boolean(PONumber.match(middleNumber)) === false ||
      Boolean(PONumber.match(beginningNumber)) === false ||
      Boolean(PONumber.match(endNumber)) === false ||
      Boolean(PONumber.match(doubleNumber)))
  ) {
    return messages.mustBeAlphaNumberic;
  }

  // otherwise return no error message
  return "";
};

export const validator = {
  // contactArray is an array of arrays
  contact: contactArray =>
    contactArray.reduce((store, [key, value]) => {
      if (key === "firstName" || key === "lastName") {
        const message = validateName(key, value);
        return [...store, [key, message]];
      }

      if (key === "email") {
        const message = validateEmail(value);
        return [...store, [key, message]];
      }

      if (key === "jobTitle") {
        const message = validateJobTitle(value);
        return [...store, [key, message]];
      }

      return store;
    }, []),
  invoice: invoiceArray =>
    invoiceArray.reduce((store, [key, value]) => {
      if (key === "PONumber") {
        const message = validatePONumber(value);
        return [...store, [key, message]];
      }

      return store;
    }, [])
};

export default validator;

// ! catch all !
// if (!jobTitle || !poNumber || !email || !name) {
//   this.setState({
//     errorMessage:
//       'First Name, Last Name, Email, and Job Title are all required fields'
//   });

// const validator = (currentPage: string, key?: string, value?: string) => {
//   if (currentPage === 'school-info') {

//   }

//     const validateContact = () => {
//       const name = this.onValidateStrings();
//       const email = this.onValidateEmail();
//       const poNumber = this.onValidateNumbers();
//       const jobTitle = this.onValidateNotEmpty();
//       if (!jobTitle || !poNumber || !email || !name) {
//         this.setState({
//           errorMessage: 'First Name, Last Name, Email, and Job Title are all required fields',
//         });
//         return false;
//       }
//       this.setState({
//         errorMessage: '',
//       });
//       return true;
//     };
//   }

//   const saveFeeReductions = () => {};
//   const saveLoaned: () => {};
//   const saveConfirmation: () => {};

//   return true;
// };

// export default validator;
