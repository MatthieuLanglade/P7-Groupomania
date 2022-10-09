const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

const postsCtrl = require('../controllers/posts');
const modelsCtrl = require('../controllers/models');
const multer = require('../middleware/multerPost-config')

router.post(
    '/', 
    auth,
    multer, 
    modelsCtrl.post,
    postsCtrl.post);
    
router.get(
    '/:id',
    postsCtrl.getByUserId);

router.get(
    '/',
    auth,
    postsCtrl.getAll);
    
router.post(
    '/:id/postLike',
    modelsCtrl.like,
    auth, 
    postsCtrl.postLike);

router.put(
    '/:id',
    auth,
    multer,
    modelsCtrl.putPost,
    postsCtrl.updateOne);

router.delete(
    '/:id',
    auth,
    multer,
    postsCtrl.deleteOne);

module.exports  = router;