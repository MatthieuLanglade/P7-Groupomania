// Dépendances
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

//Modèles
const modelsCtrl = require('../controllers/models')
const planningCtrl = require('../controllers/planning')

// Routes
    // Equipes
router.get(
    '/users/:equipeId',
    planningCtrl.getUserByEquipe
)
    // WorkSchedule
router.post(
    '/',
    modelsCtrl.workScheduleCreate,
    planningCtrl.createGarde
)
router.get(
    '/:equipe/:annee/:mois',
    planningCtrl.getGarde
)
module.exports  = router;