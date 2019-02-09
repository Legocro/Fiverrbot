const Discord = require("discord.js"),
    fs = require("fs"),
    settings = require("../Fiverrbot/Data/Settings.json"),
    basicCommands = require("./Data/BasicCommands.json");
const Client = new Discord.Client();

Client.permlevel = message => {
    if (settings.owner.includes(message.author.id)) return 2;
    //if (message.member.has(message.guild.find("name",settings.modrole))) return 1;
    return 0;
}

Client.on("ready", async () => {
    let commandsList = fs.readdirSync('./Commands/');
    Client.commands = {};
    for (i = 0; i < commandsList.length; i++) {
        let item = commandsList[i];
        if (item.match(/\.js$/)) {
            delete require.cache[require.resolve(`./Commands/${item}`)];
            Client.commands[item.slice(0, -3)] = require(`./Commands/${item}`);
        }
    }

    Client.user.setActivity("Playing with wires");
    console.log("Ready");
})

Client.on("message", (m) => {
    let message = m;
    let msg = m;
    let response = checkBasicCommands(m.content);
    if (response) {
        m.channel.send(response);
    }
   // console.log(0);
    let args = m.content.slice(settings.prefix.length).split(" ");
    if (!m.author) return;
   // console.log(1)
    if (!m.content.startsWith(settings.prefix)) return;
    //console.log(2);
    if (args[0] in Client.commands) {
        if (Client.commands[args[0]].config.permlevel > Client.permlevel(m)) {
            m.channel.send(`You don't have permission to run command \`${args[0]}\`.`);
            return
        }
        //console.log(Client.commands[args[0]]);
        Client.commands[args[0]].cmd(Client, m, args.slice(1));
    } else {
        //m.channel.send(`Couldn't find command \`${args[0]}\`.`);
    }
});
Client.on('error', (e) => console.error(e));
Client.on('warn', (e) => console.warn(e));
const checkBasicCommands = function (text) {
    for (let i in basicCommands) {
        if (text.startsWith(i))
            return basicCommands[i];
    }
    return false;
}
//Client.on('debug', (e) => console.info(e));
Client.login(settings.token);