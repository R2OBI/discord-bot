exports.run = async (bot, message, args) => {
    message.reply("Mon ping \`" + bot.ws.ping + "ms\`");
}

exports.help = {
    name:"ping"
}
