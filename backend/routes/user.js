const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const modelsCtrl = require('../controllers/models')
const multer = require('../middleware/multerUser-config')
const auth = require('../middleware/auth')
const rateLimit = require('../middleware/rate-limit')

router.post(
    '/signup', 
    multer,
    modelsCtrl.signup,
    userCtrl.signup);
    
router.post(
    '/login', 
    modelsCtrl.login,
    rateLimit, 
    userCtrl.login);

router.get(
    '/all',
    userCtrl.all);
    
router.get(
    '/:id', 
    auth,
    userCtrl.getOneUser);

router.put(
    '/:id',
    auth,
    multer,
    modelsCtrl.putUser,
    userCtrl.updateOne);

router.delete(
    '/:id',
    auth,
    multer,
    userCtrl.deleteOne);
    
module.exports  = router;