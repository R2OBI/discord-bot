module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {
        console.log(`${bot.user.username} est en ligne sur ${bot.guilds.cache.size} serveurs !`);
        bot.user.setPresence({ activities: [{ name: 'FlashZ Roleplay'}] });
    }
}
