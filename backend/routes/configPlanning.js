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
    /* Postes */
router.post(
    '/postes/',
    modelsCtrl.postesCreate,
    configPlanningCtrl.createPoste
)
router.put(
    '/postes/:id',
    modelsCtrl.postesCreate,
    configPlanningCtrl.updrateServices
)
router.delete(
    '/postes/:id',
    configPlanningCtrl.deletePoste
)
router.get(
    '/services/',
    configPlanningCtrl.getAllServices
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

module.exports  = router;