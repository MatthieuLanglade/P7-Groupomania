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

module.exports  = router;