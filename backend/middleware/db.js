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
    db.Services = require('../models/ConfigPlanning/services')(sequelize);
    db.Postes = require('../models/ConfigPlanning/postes')(sequelize);
    db.Equipes = require('../models/ConfigPlanning/equipes')(sequelize);
    db.ServicePostes = require('../models/ConfigPlanning/servicePostes')(sequelize);
    db.PosteEquipes = require('../models/ConfigPlanning/posteEquipes')(sequelize);
    db.UserServices = require('../models/ConfigPlanning/userServices')(sequelize);
    db.UserServicePostes = require('../models/ConfigPlanning/userServicePostes')(sequelize);
    db.UserPosteEquipes = require('../models/ConfigPlanning/userPosteEquipes')(sequelize);
    db.WorkSchedule = require('../models/ConfigPlanning/workShedule')(sequelize);
    
    // Création  des relations 
    /* 1. Posts */
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
    /* 2. TODO List */
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

    /* 3. Config Services-Postes-Equipes */
        // ServicePostes -> Postes
    db.ServicePostes.belongsTo(db.Postes, {
        foreignKey: {name: 'PosteId', allowNull: false},
        as: 'Postes',
        onDelete: 'CASCADE'}
        )
    db.Postes.hasMany(db.ServicePostes, {as: 'ServicePostes'})
        // ServicePostes -> Services
    db.ServicePostes.belongsTo(db.Services, {
        foreignKey: {name: 'ServiceId', allowNull: false},
        as: 'Services',
        onDelete: 'CASCADE'}
        )
    db.Services.hasMany(db.ServicePostes, {as: 'ServicePostes'})
        // PosteEquipes -> ServicePostes 
    db.PosteEquipes.belongsTo(db.ServicePostes, {
        foreignKey: {name: 'ServicePosteId', allowNull: false},
        as: 'ServicePostes',
        onDelete: 'CASCADE'}
        )
    db.ServicePostes.hasMany(db.PosteEquipes, {as: 'PosteEquipes'})
        // PosteEquipes -> Equipes 
    db.PosteEquipes.belongsTo(db.Equipes, {
        foreignKey: {name: 'EquipeId', allowNull: false},
        as: 'Equipes',
        onDelete: 'CASCADE'
    })
    db.Equipes.hasMany(db.PosteEquipes, {as: 'PosteEquipes'})

    /* 4. Config Users-Service-Postes-Equipes */
        // UserServices -> Services
    db.UserServices.belongsTo(db.Services, {
        foreignKey : {name: 'ServiceId', allowNull: false},
        as: 'Services',
        onDelete: 'CASCADE'})
    db.Services.hasMany(db.UserServices, {as: 'UserServices'})
        // UserServices -> User
    db.UserServices.belongsTo(db.User, {
        foreignKey : {name: 'UserId', allowNull: false},
        as: 'Users',
        onDelete: 'CASCADE'})
    db.User.hasMany(db.UserServices, {as: 'UserServices'})
        // UserServicePostes -> ServicePostes
    db.UserServicePostes.belongsTo(db.ServicePostes, {
        foreignKey : {name: 'ServicePosteId', allowNull: false},
        as: 'ServicePostes',
        onDelete: 'CASCADE'})
    db.ServicePostes.hasMany(db.UserServicePostes, {as: 'UserServicePostes'})
        // UserServicePostes -> UserServices
    db.UserServicePostes.belongsTo(db.UserServices, {
        foreignKey : {name: 'UserServiceId', allowNull: false},
        as: 'UserServices',
        onDelete: 'CASCADE'})
    db.UserServices.hasMany(db.UserServicePostes, {as: 'UserServicePostes'})
        // UserPosteEquipes -> PosteEquipes
    db.UserPosteEquipes.belongsTo(db.PosteEquipes, {
        foreignKey : {name: 'PosteEquipeId', allowNull: false},
        as: 'PosteEquipes',
        onDelete: 'CASCADE'})
    db.PosteEquipes.hasMany(db.UserPosteEquipes, {as: 'UserPosteEquipes'})
        // UserPosteEquipes -> UserService
    db.UserPosteEquipes.belongsTo(db.UserServicePostes, {
        foreignKey : {name: 'UserServicePosteId', allowNull: false},
        as: 'UserServicePostes',
        onDelete: 'CASCADE'})
    db.UserServicePostes.hasMany(db.UserPosteEquipes, {as: 'UserPosteEquipes'})

    /* 5. WorkSchedule */
        // WorkSchedule -> User
    db.WorkSchedule.belongsTo(db.User, {
        foreignKey: {name: 'UserId', allowNull: false},
        as: 'User',
        onDelete: 'CASCADE'
    })
    db.User.hasMany(db.WorkSchedule, {as: 'WorkSchedule'})
        // WorkSchedule -> PosteEquipe
    db.WorkSchedule.belongsTo(db.PosteEquipes, {
        foreignKey: {name: 'PosteEquipeId', allowNull: false},
        as: 'PosteEquipes',
        onDelete: 'CASCADE'
    })
    db.PosteEquipes.hasMany(db.WorkSchedule, {as: 'WorkShedule'})
    // Sync les modèles avec la DB
    // await sequelize.sync({ force: true });
    await sequelize.sync({ alter: true });
}

module.exports = db;