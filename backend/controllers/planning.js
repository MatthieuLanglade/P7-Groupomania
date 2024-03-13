const { Sequelize } = require('sequelize')
const db = require('../middleware/db')

/* 1. Fonctions */


/* 2. WorkSchedule */
    /* 2.1 Création d'une garde */
exports.createGarde = (req, res, next) => {
    db.WorkSchedule.create(req.body)
    .then(() => res.status(200).json({message: 'Garde créé'}))
    .catch(next)}
    /* 2.2 Récupère les gardes selon Equipe, Anne et mois */
exports.getGarde = (req, res, next) => {
    db.WorkSchedule.findAll({
        where : {
            PosteEquipeId : req.params.equipe,
            DateTravail: {
                [Sequelize.Op.and]: [
                    Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('DateTravail')), req.params.mois),
                    Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('DateTravail')), req.params.annee)
                ]
            }
        }
    })
    .then((workSchedule) => res.status(200).json(workSchedule))
    .catch(next)
}

/* Récupère les utilisateurs d'un service-poste-equipe */
exports.getUserByEquipe = (req, res, next) => {
    db.User.findAll({include: {
        model: db.UserServices,
        as: 'UserServices',
        required: true,
        attributes: ['id', 'ServiceId'],
        include: {
            model: db.UserServicePostes,
            as: 'UserServicePostes',
            required: true,
            attributes: ['id', 'ServicePosteId'],
            include: {
                model: db.UserPosteEquipes,
                as: 'UserPosteEquipes',
                where: {PosteEquipeId: req.params.equipeId},
                attributes: ['id', 'PosteEquipeId']
                }
            }
        }
    })
        .then((user) => res.status(200).json(user))
        .catch(next)
}