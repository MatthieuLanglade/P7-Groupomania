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
    db.TodoList = require('../models/Todolist/todolist')(sequelize);
    db.Elements = require('../models/Todolist/elements')(sequelize);
    db.ElementStatut = require('../models/Todolist/elementStatut')(sequelize);
 
    // Création  des relations 
        // User -> Posts
    db.Posts.belongsTo(db.User, {
        foreignKey :'UserId',
        as : 'User',
        onDelete: 'CASCADE'})
    db.User.hasMany(db.Posts, {as: 'Posts'})
            
        // Likes -> Posts
    db.Likes.belongsTo(db.Posts, {
        foreignKey :{name: 'PostId', allowNull: false},
        as: 'Post',
        onDelete : 'CASCADE'
    })
    db.Posts.hasMany(db.Likes, {as: 'Likes'})
        
    // Likes -> User
    db.Likes.belongsTo(db.User, {
        foreignKey :'UserId',
        as: 'User',
        onDelete : 'CASCADE'})
    db.User.hasMany(db.Likes, {as: 'Likes',})

    // ElementStatut -> Elements
    db.ElementStatut.belongsTo(db.Elements, {
        foreignKey :{name: 'ElementId', allowNull: false},
        as: 'Element',
        onDelete : 'CASCADE'
    })
    db.Elements.hasMany(db.ElementStatut, {as: 'ElementStatut'})

    // ElementStatut -> User
    db.ElementStatut.belongsTo(db.User, {
        foreignKey :{name: 'UserId', allowNull: false},
        as: 'User',
        onDelete : 'CASCADE'
    })
    db.User.hasMany(db.ElementStatut, {as: 'ElementStatut'})
    
    // Elements -> Todolist
    db.Elements.belongsTo(db.TodoList, {
        foreignKey: {name: 'TodoListId', allowNull: false},
        as: 'TodoList',
        onDelete: 'CASCADE'
    })
    db.TodoList.hasMany(db.Elements, {as: 'Element'})
    
    // TodoList -> User
    db.TodoList.belongsTo(db.User, {
        foreignKey: {name: 'UserId', allowNull: false},
        as: 'User',
        onDelete: 'CASCADE'
    })
    db.User.hasMany(db.TodoList, {as: 'TodoList'})

    // Sync les modèles avec la DB
    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
}

module.exports = db;