exports.run = async (bot, message, args) => {

          try {
    const member = message.mentions.members.first();
    const permission = message.member.permissions.has("BAN_MEMBERS");

    if (!permission)
      return message.reply(
        "? | You don't have permission to use this command"
      );

    if (!args[0]) return message.reply(`? | Please specify someone`);

    if (!member) return message.reply(`?? | Cannot find that member...`);

    if (member.id === message.author.id)
      return message.reply(`? | You cannot ban yourself!`);

    if (message.member.roles.highest.position < member.roles.highest.position)
      return message.reply(
        `? | You cannot ban user who have higher role than you...`
      );

    if (!member.bannable) return message.reply(`? | Je ne peut pas bannir cette personne.`);

    return (
      (await member.ban()) +
      message
        .reply({
          content: `:anger: | L'utilisateur ${member} a bien été ban`,
        })
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        })
    );
      } catch(err) {
        message.reply(`awww there was an ${err}`)
      }
  },





   
exports.help = {
    name:"ban"
}
