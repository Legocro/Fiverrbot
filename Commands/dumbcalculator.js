const { random, floor } = Math;

exports.cmd = (Client, m, args) => {
    m.channel.send("Result = " + floor(random() * 100000));
}
exports.config = {
    permlevel: 0
}