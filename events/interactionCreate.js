// eslint-disable-next-line no-unused-vars
const { Interaction } = require('discord.js')

module.exports = {
	name: 'interactionCreate',
	once: false,
	/**
	 * @param {Interaction} interaction
	 */
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return

		const command = interaction.client.commands.get(interaction.commandName)

		if (!command) return

		try {
			await command.execute(interaction)
		}
		catch (error) {
			console.error(error)
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
		}
	},
}