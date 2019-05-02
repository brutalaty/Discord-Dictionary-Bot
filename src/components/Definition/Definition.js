const api = require("./RapidApi/RapidApi");
const command = "define";

const Definition = (msg, commands) => {
  if (!sanitised(msg, commands)) return;
  const searchTerm = commands.join(" ");

  api.getWord(msg, searchTerm, onSuccess, onFail);
};

const sanitised = (msg, commands) => {
  if (commands.length < 1) {
    msg.channel.send("format is incorrect. expected: define searchTerm");
    msg.channel.send("i.e: define Peristalsis");
    return false;
  }
  return true;
};

const onSuccess = (msg, data) => {
  const lines = [
    "Dictionary: wordsapi.com",
    "Define: " + data.word,
    "Syllables: " + data.syllables,
    Array("syllables: ".length + data.syllables.length).join("-"),
    ...data.definitions.map(
      (def, index) => (index + 1).toString() + (": " + def.definition)
    )
  ];

  msg.channel.send(lines.join(" \n "));
};

const onFail = (msg, code) => {
  msg.channel.send("Something went wrong");
};

module.exports = {
  Command: command,
  execute: Definition
};
