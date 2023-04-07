//Importando as dependências necessárias.
const { REST, Routes } = require('discord.js');
//Importando o ID do bot, ID do servidor e o TOKEN
const { clientId, guildId, token } = require('./config.json'); 
 // Importando a biblioteca 'fs' do node para ler os arquivos.
const fs = require('node:fs');

//Array para armazenar os comandos
const commands = []; 

//Filtrando e lendo os arquivos que termina em .js (arquivos JavsScript)
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Importando os dados JSON dos comandos e adicionando a Array "commands"
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Criando uma instância do REST e preparando para fazer as requisições com o TOKEN
const rest = new REST({ version: '10' }).setToken(token);

// Enviando comandos
(async () => {
	try {
		console.log(`Iniciando ${commands.length} (/) comandos`);

		// O método put é usado para carregar todos os comandos no servidor 
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Sucesso ao carregar ${data.length} (/) comandos.`);
	} catch (error) {
		// Se ocorrer algum erro, é exibido no console
		console.error(error);
	}
})();