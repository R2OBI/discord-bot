const { prefix, token } = require("./config.json");

const { Client, Intents, Collection } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });

const fs = require("fs");

bot.commands = new Collection();
console.log("Commande :")
const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
for (const file of commandFiles) {
    const props = require(`./commands/${file}`)
    console.log(`${file} a été chargé`)
    bot.commands.set(props.help.name, props)
}

const commandSubFolders = fs.readdirSync('./commands/').filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}/`).filter(f => f.endsWith('.js'))
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`)
        console.log(`${file} chargé pour ${folder}`)
        bot.commands.set(props.help.name, props)
    }
});
console.log("-------------------")
console.log("Event :")
const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if(event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot))
        console.log(`${event.name} a été chargé`)
    } else {
        bot.on(event.name, (...args) => event.execute(...args, bot))
    }
}

bot.on("message",msg => {
    if(msg.content == "Backup code"){
        return msg.reply ("Backup code")
    }
    if(msg.content == "!db"){
        return msg.reply('${require('quick.db').version}')
    }
});

bot.on("messageCreate", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if(!cmd.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args);


});
bot.login(token);
