exports.cmd = (Client, m, args) => {
    m.channel.send("Pong!").then(msg => { msg.edit("Pong!" + msg.createdTimestamp - m.createdTimestamp + "ms") });
}
exports.config = {
    permlevel: 1
} 