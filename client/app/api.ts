import axios from "axios";

// attach headers to every request
export const axiosGuard = axios.create();
axiosGuard.interceptors.request.use(config => {
  // eslint-disable-next-line no-param-reassign, fp/no-mutation, immutable/no-mutation
  config.headers.jwt = localStorage.getItem("jwt");
  return config;
});

console.log("from api.ts", process.env.NODE_TREE);

// url api gateway environments
const baseUrl = {
  oak: "https://3e9wfh741b.execute-api.us-east-1.amazonaws.com/oak",
  dev: "https://m6260u2gl4.execute-api.us-east-1.amazonaws.com/dev",
  palm: "https://3xz52vm4t6.execute-api.us-east-1.amazonaws.com/palm",
  pear: "https://3xz52vm4t6.execute-api.us-east-1.amazonaws.com/pear",
  birch: "https://i6nyz7hcp6.execute-api.us-east-1.amazonaws.com/birch",
  willow: "https://dc3xrndm1g.execute-api.us-east-1.amazonaws.com/willow"
};

export default {
  user: {
    login: credentials =>
      axios.post("/login", { credentials }).then(({ data }) => data.user),

    signup: user =>
      axios.post("/signup", { user }).then(({ data }) => data.user),

    refresh: user =>
      axios.post("/refresh", { user }).then(({ data }) => data.user)
  },

  contact: {
    // get the contact info of an aicode
    info: async (aicode: string): Promise<any> =>
      axios
        .get(`${baseUrl.dev}/invoice/contact/${aicode}`)
        .then(({ data }) => JSON.parse(data.body)),

    // save the contact info of a particular org/event id
    save: async (
      contactInfo,
      aicode: string,
      orgIdEventId: any
    ): Promise<any> =>
      axios({
        method: "post",
        url: `${baseUrl.dev}/invoice/contact/${aicode}`,
        data: {
          input: {
            contact: contactInfo,
            orgIdEventId
          },
          type: "contact"
        }
      }).then(({ data }) => data)
  },

  invoicing: {
    // contains large invoice object
    inputs: (orgId: string, eventId: string): Promise<any> =>
      axios({
        method: "post",
        url: `${baseUrl.dev}/invoice/getInvoiceInputs`,
        data: { orgId, eventId }
      }).then(({ data }) => data),

    // contains invoice date ranges
    metadata: (orgId: string, childEventId: string): Promise<any> =>
      axios({
        method: "post",
        url: `${baseUrl.dev}/invoice/getMetadata`,
        data: { orgId, childEventId }
      }).then(({ data }) => data),

    // list of students for fee reduction benefits page
    getStudentList: (orgId: string, eventId: string): Promise<any> =>
      axios({
        method: "post",
        url: `${baseUrl.dev}/invoice/getTestTakerList`,
        data: { orgId, eventId }
      }).then(({ data }) => data.TestTakers),

    // list of schools for selecting schools loaned to modal
    getSchoolList: (
      { school, zipcode, city, state, ownAiCode },
      source
    ): Promise<any> =>
      axios
        .get(
          `${
            baseUrl.dev
          }/invoice/getSchoolList?school=${school}&city=${city}&state=${state}&zipcode=${zipcode}&aiCode=${ownAiCode}`,
          { cancelToken: source.token }
        )
        .then(({ data }) => data),

    // save the delta of selected fee reduction students
    saveStudentList: (testTakers, orgIdEventId): Promise<any> =>
      axios({
        method: "post",
        url: `${baseUrl.dev}/invoice/saveFRB`,
        data: { orgIdEventId, testTakers }
      }).then(({ data }) => data),

    // save the schools loaned to
    saveLoaned: (invoice): Promise<any> =>
      axios({
        method: "post",
        url: `${baseUrl.dev}/invoice/saveInvoiceInputs`,
        data: { input: invoice, type: "loaned" }
      }).then(({ data }) => data),

    // save misgrids from grade adjustment modal
    saveMisgrids: (invoice): Promise<any> =>
      axios({
        method: "post",
        url: `${baseUrl.dev}/invoice/saveInvoiceInputs`,
        data: {
          input: invoice,
          type: "misgrid"
        }
      }).then(({ data }) => data)
  }
};
