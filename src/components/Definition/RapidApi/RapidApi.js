const axios = require("axios");
const config = require("./config.json");

const axiosConfig = {
  baseURL: config.host,
  timeout: 3000,
  headers: {
    [config.headerHost.key]: config.headerHost.value,
    [config.headerKey.key]: config.headerKey.value
  }
};
const axiosInstance = axios.create(axiosConfig);

const getWord = (msg, word, onSuccess, onFail) => {
  axiosInstance
    .get("/words/" + word)
    .then(function(response) {
      onSuccess(msg, formatResponse(response.data));
    })
    .catch(function(error) {
      console.log(error);
      onFail(msg, error.Error);
    });
};

const formatResponse = data => {
  if (!data) return data;
  const syls = data.syllables.list;
  const syl = syls.length > 1 ? syls.join("-") : syls[0];
  const res = data.results;

  const outData = {
    word: data.word,
    syllables: syl,
    definitions: res
  };
  return outData;
};

module.exports = { getWord: getWord };
