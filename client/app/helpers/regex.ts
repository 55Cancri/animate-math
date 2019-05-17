// export an object of regex that can be utilized with dot notation once imported

export default {
  numbers: {
    beginningNumber: /^[^ '-].*/,

    middleNumber: /^[\w #$',\-./:\\]*$/,

    endNumber: /.*[^ '-]$/,

    doubleNumber: /([#$',\-./:\\_]{2})/,
  },

  // eslint-disable-next-line optimize-regex/optimize-regex
  string: /^(?!.*[ \'-]{2})(?![ ])[a-zA-Z \'-]*[a-zA-Z]$/,

  email: /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\d-A-Za-z]+\.)+[A-Za-z]{2,}))$/,
};
