const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const db = {} 

initialize();

async function initialize() {
    // Création de la DB si n'existe pas
    const { host, sqlport, user, password, database } = process.env;
    console.log(sqlport);
    const connection = await mysql.createConnection({ host, sqlport, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // Connection à la DB
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // Init des modèles & ajout à db exportée
    db.User = require('../models/user')(sequelize);
    db.Posts = require('../models/posts')(sequelize);
    db.Likes = require('../models/likes')(sequelize);
 
    // Création  des relations 
        // User -> Posts
    db.User.hasMany(db.Posts, {as: 'Posts'})
    db.Posts.belongsTo(db.User, {
        foreignKey :'UserId',
        as : 'User',
        onDelete: 'CASCADE'})

        // Likes -> Posts
    db.Posts.hasMany(db.Likes, {
        as: 'Likes'
    })
    db.Likes.belongsTo(db.User, {
        foreignKey :'UserId',
        as: 'User',
        onDelete : 'CASCADE'})
        
        // Likes -> User
    db.Likes.belongsTo(db.Posts, {
        foreignKey :{name: 'PostId', allowNull: false},
        as: 'Post',
        onDelete : 'CASCADE'
    })
    db.User.hasMany(db.Likes, {
        as: 'Likes',
    })

    // Sync les modèles avec la DB
    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
}

module.exports = db;