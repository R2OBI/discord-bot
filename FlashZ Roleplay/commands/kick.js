exports.run = async (bot, message, args) => {
  
        const { member, mentions } = message
        const permission = message.member.permissions.has("KICK_MEMBERS");

        const tag = `<@${member.id}>`
    
        if (
            message.member.permissions.has('ADMINISTRATOR') ||
            message.member.permissions.has('KICK_MEMBERS')
        ) {
          const target = mentions.users.first()
          if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`:anger: | L'utilisateur à bien été kick`)
          } else {
            message.channel.send(`${tag} Merci de bien vouloir selectionner la personne à kick.`)
          }
        } else {
          message.channel.send(
            `${tag} Vous n'avez pas la permission d'utiliser cette commande.`
          )
        }
      }
  
    


exports.help = {
    name:"kick"
}
