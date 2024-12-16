module.exports = {
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
  },
  transformIgnorePatterns: ["node_modules/(?!axios)"],
};
