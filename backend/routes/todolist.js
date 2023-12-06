// Dépendances
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')

// Modèles
const modelsCtrl = require('../controllers/models')
const todoCtrl = require('../controllers/todolist')

// Routes
    // TODO
router.post(
    '/',
    auth,
    modelsCtrl.todoCreate,
    todoCtrl.createTodo)
router.put(
    '/:id',
    auth,
    modelsCtrl.todoUpdate,
    todoCtrl.updateTodo)
router.delete(
    '/:id',
    auth,
    todoCtrl.deleteTodo)
router.get(
    '/',
    auth,
    todoCtrl.getTodoByUserId
    )
    // ELEMENT
router.post(
    '/:id/element',
    auth,
    modelsCtrl.elementCreate,
    todoCtrl.createElement)
router.delete(
    '/:id/element/:id',
    auth,
    todoCtrl.deleteElement
)
router.put(
    '/:id/element/:id',
    auth,
    todoCtrl.updateElement
)
    // VALIDATION
router.post(
    '/:id/element/:id/validate',
    auth,
    modelsCtrl.validateElement,
    todoCtrl.validateElement)
    
module.exports  = router;