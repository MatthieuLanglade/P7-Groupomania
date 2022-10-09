const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const fs = require ('fs')
const db = require('../middleware/db');
const dotenv = require('dotenv').config();
const erreurConnexion = 'Paire login/mot de passe incorrecte';

/* Création d'utilisateur */
async function create(params) {
    // Vérifie l'adresse mail
    if (await db.User.findOne({ where: { email: params.email } })) {
        throw {message: 'email déjà utilisé'}
    }
    const user = new db.User(params);
    // Hash mdp
    user.passwordHash = await bcrypt.hash(params.password, parseInt(process.env.HASHNUMBER));
    // Rajout de admin = 0 pour éviter une injection sur l'inscription.
    user.admin = 0 
    // Enregistre l'utilisateur
    await user.save();
}
exports.signup = (req, res, next) => {
    const newUser = {...req.body,
        profilPicture: req.file 
            ? `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}` 
            : `${req.protocol}://${req.get('host')}/images/users/default.png`
    }
    console.log(newUser)
    create(newUser)
        .then(() => res.status(200).json({ message: 'Utilisateur créé'}))
        .catch(next);
};

/* Vérifier utilisateur */
async function getUser(params) {
    const user = await db.User.scope('withHash').findOne({where: {email: params.email}});
    if (!user) throw erreurConnexion
    if (! await bcrypt.compare(params.password, user.passwordHash)) throw erreurConnexion
    return user
}

/* Login */
exports.login = (req, res, next) => {
    getUser(req.body)
    .then((user) =>res.send({
        userId: user.id,
        admin: user.admin,
        token: jwt.sign(
            {userId: user.id,
            admin: user.admin},
            process.env.TOKEN,
            {expiresIn: '24h'})
        }))
    .catch(next)
}

/* Récupère tous les utilisateurs */
exports.all = (req, res, next) => {
    db.User.findAll()
        .then((user) => res.status(200).json(user))
        .catch(next)
}

/* Récupère un utilisateur */
exports.getOneUser = (req, res, next) => {
    console.log(req.params);
    db.User.findByPk(req.params.id)
        .then((user) => res.status(200).json(user))
        .catch(next)
}

/* Vérifier Email, existance userId & auth = params */ 
async function checkValide(req){
    // Vérifier si email déjà existant
    if (req.body.email !== undefined) {if (await db.User.findOne({where: {email: req.body.email}})) 
        {return {erreur: "email déjà existant", status: 400}}}
    // Vérifier si userId existe (depuis params)
    if (await db.User.findByPk(req.params.id) === null) 
        {return {erreur: "utilisateur inconnu", status: 400}}
    // Vérifier si userId = auth.userID ou ADMIN
    console.log('ADMIN ?', req.auth);
    if ((req.params.id != req.auth.userId) && !req.auth.admin) 
        {return {erreur: "non autorisé", status: 401}}
    // Récupérer l'utilisateur
    return user = await db.User.findByPk(req.params.id)
}
/* Modifier un utilisateur */ 
exports.updateOne = (req, res, next) => {
    console.log(req.body);
    // Vérifications
    checkValide(req)
    .then((user) => {
    // Vérifie si erreur
    if (user.erreur) {res.status(user.status).json({message: user.erreur})}
    else {
        // Supprimer l'ancienne image de la BDD
        let newUser = {}
        if (req.file) {
            // MAJ de l'object avec req.file
            newUser = {...req.body,
            profilPicture: `${req.protocol}://${req.get('host')}/images/users/${req.file.filename}`}
            
            const filename = user.profilPicture.split('/images/users')[1]
            fs.unlink(`images/users/${filename}`, () => {
            })
        } else {newUser = {...req.body}}
        // Update La BDD 
        Object.assign(user, newUser)
        user.save()
        .then(() => res.status(201).json({message : "Modification effectuée"}))
    }}
        )
    .catch(next)
}

/* Supprime un utilisateur */
exports.deleteOne = (req, res, next) => {
    console.log(req.auth);
    checkValide(req)
    .then((user) => {
    // Vérifie si erreur
    if (user.erreur) {res.status(user.status).json({message: user.erreur})}
    else {
        // Update La BDD 
        user.destroy()
        .then(() => res.status(201).json({message : "Suppression effectuée"}))
    }}
    )
    .catch(next)
}