const db = require('../middleware/db')

/* 1. Fonctions */
    /* 1.1 Récupérer TABLE par ID  */
async function getTableById(params,Table){
    const result = await Table.findByPk(params)
    return result
}
/* 2. Services */
 /* 2.1 Création de service */
exports.createServices = (req, res, next) => {
    db.Services.create(req.body)
    .then(() => res.status(200).json({message: 'Service créé'}))
    .catch(next)}

 /* 2.2 Modification de service */
exports.updrateServices = (req, res, next) => {
    // Récupère Services dans la base
    getTableById(req.params.id, db.Services)
    .then((service) => {
        if (!service) {res.status(401).json({message: "Ce service n'existe pas."})}
        else {
            Object.assign(service, req.body)
            service.save()
            .then(() => res.status(200).json({message: "Service modifié"}))
            .catch(next)
        }
    })
}

 /* 2.3 Suppression de service */
 exports.deleteServices = (req, res, next) => {
    getTableById(req.params.id, db.Services)
    .then((service) => {
        if (!service) {res.status(401).json({message: "Ce service n'existe pas."})}
        else {
            service.destroy()
            .then(() => res.status(200).json({message: "Service supprimé"}))
            .catch(next)
        }
    })
}

/* 2.4 Récupéreation de la liste des services */
exports.getAllServices = (req, res, next) => {
    db.Services.findAll({
        include:
            {model: db.PosteService,
                include: {
                    model: db.Postes,
                    as: 'Postes',
                    attributes: ['id', 'nomPoste']
                },
            as: 'PosteService',
            attributes: ['id']},
        attributes: ['id', 'nomService']
        })
    .then((services) => res.status(200).json({services}))
}

/* 3. Poste */
 /* 3.1 Création de Poste */
exports.createPoste = (req, res, next) => {
    db.Postes.create(req.body)
    .then(() => res.status(200).json({message: 'Poste créé'}))
    .catch(next)}

 /* 3.2 Modification de Poste */
exports.updatePoste = (req, res, next) => {
    // Récupère Services dans la base
    getTableById(req.params.id, db.Postes)
    .then((poste) => {
        if (!poste) {res.status(401).json({message: "Ce poste n'existe pas."})}
        else {
            Object.assign(poste, req.body)
            service.save()
            .then(() => res.status(200).json({message: "Poste modifié"}))
            .catch(next)
        }
    })
}

 /* 3.3 Suppression de Poste */
 exports.deletePoste = (req, res, next) => {
    getTableById(req.params.id, db.Postes)
    .then((poste) => {
        if (!poste) {res.status(401).json({message: "Ce poste n'existe pas."})}
        else {
            poste.destroy()
            .then(() => res.status(200).json({message: "Poste supprimé"}))
            .catch(next)
        }
    })
}

 /* 3.4 Association Poste - Service */
 exports.associatePoste = (req, res, next) => {
    console.log(req.params)
    db.PosteService.create(req.params)
    .then((done) => res.status(200).json({message: 'Association effectuée', done}))
    .catch(next)
}

 /* 3.5 Récupération liste des postes */
exports.getAllPostes = (req, res, next) => {
    db.Postes.findAll({attributes: ['id','nomPoste']})
    .then((postes) => res.status(200).json({postes}))
}
