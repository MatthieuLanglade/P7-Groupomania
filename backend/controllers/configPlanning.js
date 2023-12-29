const db = require('../middleware/db')

/* 1. Fonctions */
    /* 1.1 Récupérer TABLE par ID  */
async function getTableById(params,Table){
    const result = await Table.findByPk(params)
    return result
}
    /* 1.2 Récupérer TABLE par élément */
async function getTableByElement(params, Table) {
    const result = await Table.findOne({where: {PosteId: params.PosteId, ServiceId: params.ServiceId} })
    return result
}

/* 2. Services */
 /* 2.1 Création de service */
exports.createServices = (req, res, next) => {
    console.log(req.body);
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

/* 2.4 Récupéreation de la liste des services AVEC ASSOCIATIONS */
exports.getAllServices = (req, res, next) => {
    db.Services.findAll({
        attributes: ['id', 'nom'],
        include:
            {
                model: db.ServicePostes,
                as: 'ServicePostes',
                attributes: ['id'],
                include: [
                {
                    model: db.Postes,
                    as: 'Postes',
                    attributes: ['id', 'nom']
                },
                {
                    model: db.PosteEquipes, 
                    as: 'PosteEquipes',
                    attributes: ['id'],
                    include : {
                        model: db.Equipes,
                        as: 'Equipes',
                        attributes: ['id', 'nom']
                    }
                }]
            }
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
            poste.save()
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
            // console.log(poste)
            // res.status(200).json(poste)
            poste.destroy()
            .then(() => res.status(200).json({message: "Poste supprimé"}))
            .catch(next)
        }
    })
}

 /* 3.4 Association Service-Poste */
 exports.associatePoste = (req, res, next) => {
    db.ServicePostes.create(req.params)
    .then(() => res.status(200).json({message: 'Association effectuée'}))
    .catch(next)
}

/* 3.5 Suppression d'Association Service-Poste */
exports.deleteAssociatePoste = (req, res, next) => {
    console.log(req.params)
    db.ServicePostes.findOne({where: {PosteId: req.params.PosteId, ServiceId: req.params.ServiceId}})
        .then((servicePostes) => {
            if (!servicePostes) {res.status(401).json({message: "Cette association n'existe pas"})}
            else {
                db.ServicePostes.destroy({where: {id: servicePostes.id}})
                    .then (() => res.status(200).json({message: 'Association supprimée'}))
                    .catch(next)
            }
        })
    
}

    /* 3.6 Récupération liste des postes */

exports.getAllPostes = (req, res, next) => {
    db.Postes.findAll({attributes: ['id','nom']})
    .then((postes) => res.status(200).json({postes}))
}


/* 4. Equipe */
    /* 4.1 Création d'Equipe */
exports.createEquipe = (req, res, next) => {
    console.log(req.body);
    db.Equipes.create(req.body)
    .then(() => res.status(200).json({message: 'Equipe créé'}))
    .catch(next)}
    
    /* 4.2 Modification d'Equipe */
exports.updateEquipe = (req, res, next) => {
    getTableById(req.params.id, db.Equipes)
    .then((equipe) => {
        if (!equipe) {res.status(401).json({message: "Cette equipe n'existe pas."})}
        else {
            Object.assign(equipe, req.body)
            equipe.save()
            .then(() => res.status(200).json({message: "Equipe modifié"}))
            .catch(next)
        }
    })
}
    
    /* 4.3 Suppression d'Equipe */
 exports.deleteEquipe = (req, res, next) => {
    getTableById(req.params.id, db.Equipes)
    .then((equipe) => {
        if (!equipe) {res.status(401).json({message: "Cette equipe n'existe pas."})}
        else {
            equipe.destroy()
            .then(() => res.status(200).json({message: "Equipe supprimée"}))
            .catch(next)
        }
    })
}
    
    /* 4.4 Association Service-Equipe */
 exports.associateEquipe = (req, res, next) => {
    db.PosteEquipes.create(req.params)
    .then(() => res.status(200).json({message: 'Association effectuée'}))
    .catch(next)
}
    
    /* 4.5 Suppression d'Association Service-Equipe */

    /* 4.6 Récupération liste des postes */
    exports.getAllEquipes = (req, res, next) => {
        db.Equipes.findAll({attributes: ['id','nom']})
        .then((equipes) => res.status(200).json({equipes}))
    }