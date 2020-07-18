const Sequelize = require('sequelize');
const Discord = require('discord.js');

const comicsSeq = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'scomics.sqlite',
});

const comics = comicsSeq.define('comics', {
	id: {
        primaryKey: true,
		type: Sequelize.INTEGER,
        unique: true,
    },
    image: {
        type: Sequelize.STRING,
        unique: true,
    },
    instagram: {
		type: Sequelize.STRING,
        unique: true,
	},
});

module.exports = {
	name: 'addcomic',
	description: 'Send info about the current Hot-Lap-Challenge!',
	async execute(message, args) {

        if (!message.member.roles.cache.has('641618875846492170')) {
            message.channel.send("I'm sorry, you do not have the permissions to do that. If you think this was a mistake please contact <@320574128568401920>")
            return
        }
        else if (args.length != 2) {
            message.channel.send("I'm sorry, it seems like you entered the command wrong. Please check if you entered it correcty or use !commands to see how your command should look like. If you believe there is an error, please contact <@320574128568401920>")
            return
        }
        else {
            try {
                const add = await comics.create({
                    image: args[0],
                    instagram: args[1]
                });
                return message.channel.send(`Comic ${add.image} with link ${add.instagram} added.`);
                
            } catch (e) {
                if (e.image === 'SequelizeUniqueConstraintError') {
                    return message.channel.send('That comic already exists.');
                }
                return message.channel.send('Something went wrong with adding a link.');
            }
        }
	},
};