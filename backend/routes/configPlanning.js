// Dépendances
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

//Modèles
const modelsCtrl = require('../controllers/models')
const configPlanningCtrl = require('../controllers/configPlanning')

// Routes
    /* Services */
router.post(
    '/services/',
    // auth, A RAJOUTER, GESTION DES AUTORISATIONS UTILISATEUR
    modelsCtrl.servicesCreate,
    configPlanningCtrl.createServices
)
router.put(
    '/services/:id',
    modelsCtrl.servicesCreate,
    configPlanningCtrl.updrateServices
    )
router.delete(
        '/services/:id',
        configPlanningCtrl.deleteServices
        )
router.get(
    '/services/',
    configPlanningCtrl.getAllServices
)
    /* Postes */
router.post(
    '/postes/',
    modelsCtrl.postesCreate,
    configPlanningCtrl.createPoste
)
router.put(
    '/postes/:id',
    modelsCtrl.postesCreate,
    configPlanningCtrl.updatePoste
)
router.delete(
    '/postes/:id',
    configPlanningCtrl.deletePoste
)
router.get(
    '/postes/',
    configPlanningCtrl.getAllPostes
)
    /* Associer un poste à un service */ 
router.post(
    '/services/:ServiceId/postes/:PosteId',
    configPlanningCtrl.associatePoste
)
router.delete(
    '/services/:ServiceId/postes/:PosteId',
    configPlanningCtrl.deleteAssociatePoste
)
    /* Equipes */
router.post(
    '/equipes/',
    modelsCtrl.equipesCreate,
    configPlanningCtrl.createEquipe
)
router.put(
    '/equipes/:id',
    modelsCtrl.equipesCreate,
    configPlanningCtrl.updateEquipe
)
router.delete(
    '/equipes/:id',
    configPlanningCtrl.deleteEquipe
)
router.get(
    '/equipes/',
    configPlanningCtrl.getAllEquipes
)
/* Associer une équipe à un ServicePoste */ 
router.post(
    '/servicepostes/:ServicePosteId/equipes/:EquipeId',
    configPlanningCtrl.associateEquipe
)
router.delete(
    '/servicepostes/:ServicePosteId/equipes/:EquipeId',
    configPlanningCtrl.unassociateEquipe
)
/* Association User-Service-Poste-Equipe */
    /* UserServices */
router.post(
    '/users/:UserId/services/:ServiceId',
    configPlanningCtrl.associateUserService
)
router.delete(
    '/users/:UserId/services/:ServiceId',
    configPlanningCtrl.unassociateUserService
)
    /* UserServicePostes */
router.post(
    '/users/:UserId/servicepostes/:ServicePosteId',
    configPlanningCtrl.associateUserServicePoste
)
router.delete(
    '/users/:UserId/servicepostes/:ServicePosteId',
    configPlanningCtrl.unassociateUserServicePoste
)
    /* UserPosteEquipes */
router.post(
    '/users/:UserId/posteequipes/:PosteEquipeId',
    configPlanningCtrl.associateUserPosteEquipe
)
router.delete(
    '/users/:UserId/posteequipes/:PosteEquipeId',
    configPlanningCtrl.unassociateUserPosteEquipe
)

module.exports  = router;