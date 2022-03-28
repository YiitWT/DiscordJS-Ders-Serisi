const {MessageEmbed} = require("discord.js")

module.exports = {
    description: "Bot'un ping değerini gösterir.",
    run: async (client, interaction) => {
        const msg = new MessageEmbed()
        .setTitle("Pong! 🏓")
        .setDescription(`
            Bot'un ping değeri : ${client.ws.ping}
        `)
        interaction.reply({embeds:[msg]})


    }}
