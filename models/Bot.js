const { Client, Collection, GatewayIntentBits } = require('discord.js')
const path = require('node:path')
const fs = require('node:fs')

class Bot extends Client {
	constructor() {
		super({ intents: [GatewayIntentBits.Guilds] })

		this.commands = new Collection()
		this.config = require('../config.json')
	}

	async setCommands () {
		const cmdPath = path.join(process.cwd(), 'commands')
		const cmdFiles = fs.readdirSync(cmdPath).filter(f => f.endsWith('.js'))

		for (const file of cmdFiles) {
			const filePath = path.join(cmdPath, file)
			const cmd = require(filePath)

			this.commands.set(cmd.data.name, cmd)
		}

		console.log(`Loaded ${this.commands.size}/${cmdFiles.length} commands`)
	}

	async start () {
		await this.setCommands()
		await this.login(this.config.token)
	}
}

module.exports = Bot