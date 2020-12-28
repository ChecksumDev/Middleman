const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Images = sequelize.define('images', {
	url: {
		type: Sequelize.STRING,
		unique: true,
	},
	rating: Sequelize.STRING,
	author: Sequelize.STRING,
});

exports.Images = Images;