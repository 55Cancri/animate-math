import moment from 'moment';

export default {
  requireTokens: false,
  globalHeader: false,
  globalFooter: false,
  roleButtons: false,

  // 0 = january, 11 = december
  currentDate: moment().set({ month: 4, date: 2 }), // moment() // <- 1) custom date, 2)

  logs: {
    contact: false, // log immediate contact response
    metadata: false, // log immediate metadata response
    invoice: false, // log immediate invoice response
    students: false, // log immediate fee waiver student list response
    storeObject: false, // log final object of all responses
    loanPage: true, // log logic used to render the loan page, wrapper/index.tsx
    loanValidation: false, // log logic used to validate the loan page
    frbPage: false, // log logic used to render the frb page, wrapper/index.tsx
  },

  mock: {
    contact: false,
    students: false, // fee waiver test taker names list
  },
};
