const file = require("fs").readFileSync("./Data/Topics.txt", "utf-8")
const topics = file.split(",");

exports.cmd = (Client, m, args) => {
    let index = Math.floor(topics.length * Math.random());
    let topic = topics[index].replace(/"\r?\n|\r/, "").
    m.channel.send("We shall now talk about " + topic);
}
exports.config = {
    permlevel: 0
}