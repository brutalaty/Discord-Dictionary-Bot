const Discord = require("discord.js");
const Definition = require("./src/components/Definition/Definition");
const client = new Discord.Client();
const config = require("./config.json");

const delimiter = config.delimiter;

client.on("ready", () => {
  console.log("I am here and I am ready to work!");
});

client.on("message", msg => {
  if (isValidCommand(msg)) doCommand(msg);
});

const doCommand = msg => {
  const text = removeDelimiter(msg.content);
  const commands = text.split(" ");
  const sensitivity = { sensitivity: "accent" };
  if (
    commands[0].localeCompare(Definition.Command, undefined, sensitivity) === 0
  ) {
    const instructions = commands.slice(1, commands.length);
    Definition.execute(msg, instructions);
  } else if (commands[0].localeCompare("Hello", undefined, sensitivity) === 0) {
    msg.channel.send("Hello " + msg.author);
  } else {
    msg.channel.send(
      commands[0] + " is an invalid command. Use 'Hello' or 'Define searchTerm'"
    );
  }
};

function isValidCommand(msg) {
  if (msg.author.bot) return false;
  if (msg.content.length < 2) return false;
  if (!msg.content.startsWith(delimiter)) return false;
  return true;
}

function removeDelimiter(text) {
  return text
    .split("")
    .slice(1, text.length)
    .join("");
}

client.login(config.token);
