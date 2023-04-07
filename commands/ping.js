const { SlashCommandBuilder, Embed, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Veja o ping do bot!'),
        
	async execute(interaction) {
		const embedPing = new EmbedBuilder()
		.setColor('Blue')
		.setDescription(`Meu ping é ${interaction.client.ws.ping}`)
		await interaction.reply({ embeds: [embedPing], ephemeral: true});
	},
};