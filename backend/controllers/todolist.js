const db = require('../middleware/db')

/* 1. Fonctions de recherche */
    /* 1.1 Récupérer TABLE par ID  */
async function getTableById(params,Table){
    const result = await Table.findByPk(params)
    return result
}
    /* 1.2 Récupérer la Validation de l'Element */
async function findValidatetable(params) {
    const validateValue = await db.ElementStatut.findOne({where: {ElementId: params.ElementId}})
    return validateValue
}

/*  2. Gestion TODO LIST */
    // 2.1 Création de la TODO LIST
exports.createTodo = (req, res, next) => {
    db.TodoList.create({...req.body, 'UserId': req.auth.userId})
    .then(() => res.status(200).json({message: 'TODOLIST créé'}))
    .catch(next)}
    // 2.2 Modification de la TODO LIST
exports.updateTodo = (req, res, next) => {
    // Récupère TODO dans la base
    getTableById(req.params.id, db.TodoList) 
    .then((todo) => {
        if (!todo) {res.status(401).json({message : "Cette Todolist n'existe pas"})}
        else {
            // Vérifie si TODO appartient au USER logé
            if (todo.UserId != req.auth.userId) {res.status(401).json('non autorisé')}
            else {
                // Modifie la TODO
                Object.assign(todo, req.body)
                todo.save()
                .then(() => res.status(200).json({message: 'TODOLIST modifié'}))
                .catch(next)
            }
        }
    })
} 
    // 2.3 Suppression de la TODO LIST
exports.deleteTodo = (req, res, next) => {
    // Récupère TODO dans la base
    getTableById(req.params.id, db.TodoList)
    .then((todo) => {
        if (!todo) {res.status(401).json({message : "Cette Todolist n'existe pas"})}
        else {
            // Vérifie si TODO appartient au USER logé
            if (todo.UserId != req.auth.userId) {res.status(401).json('non autorisé')}
            else {
                // Supprime la TODO
                todo.destroy()
                .then(() => res.status(200).json({message: 'TODOLIST supprimé'}))
                .catch(next)
            }
        }
    })

}
    // 2.4 Affichage de la TODO LIST par USER ID
exports.getTodoByUserId = (req, res, next) => {
    db.TodoList.findAll({
        include: [
        {
            model: db.Elements, 
            include: [{
                model: db.ElementStatut,
                include: [{
                    model: db.User,
                    as: 'User',
                    attributes: ['lastName', 'firstname']
                }],
                as: 'ElementStatut'
            }],
            as : 'Element'
        }],
        order: [['createdAt', 'DESC']]})
    .then((todo) => res.status(201).json({todo}))
    .catch(next)
}

/* 3. ELEMENT */
    /* 3.1 Création élément */
exports.createElement = (req, res, next) => {
    // Récupères les infos de la TodoList
    getTableById(req.params.id, db.TodoList) 
    .then((todo) => {
        if (!todo) {res.status(401).json({message : "Cette Todolist n'existe pas"})}
        else {
        // Vérifie si todoListId appartient au userId
        /* Par la suite, modifier la gestion de l'autorisation pour permettre le partage  */
        if(todo.dataValues.UserId != req.auth.userId) {res.status(401).json('non autorisé')} 
        else {
            db.Elements.create({
                ...req.body, 
                'TodoListId' : todo.dataValues.id})
        }}
    })
    .then(() => res.status(200).json({message: "Element de la liste créé"}))
    .catch(next)
}
/* 3.2 Modification Element */

/* 3.3 Suppression Element */

    /* 3.4 Validation Element */
exports.validateElement = (req, res, next) => {
    // Récupère les infos de l'élèment concerné
    getTableById(req.params.id, db.Elements)
    .then((element) => {
        if (!element) {res.status(401).json({message : "Cet Element n'existe pas"})}
        else {
        // Récupère les infos de la TodoList concernée
        getTableById(element.TodoListId, db.TodoList)
        .then((todo) => {
            if (!todo) {res.status(401).json({message : "Cette Todolist n'existe pas"})}
            else {
            if(todo.dataValues.UserId != req.auth.userId) {res.status(401).json('non autorisé')}
            else {
                const validateTable = {
                    'validate': true,
                    'ElementId' : element.id,
                    'UserId' : req.auth.userId
                }
                // Cherche si la validation Existe
                findValidatetable(validateTable)
                    .then((respValidate) => {
                        if (!respValidate)  {
                            db.ElementStatut.create(validateTable)
                            .then(() => res.status(200).json({message: "Element de la liste validé"}))
                            .catch(next)}
                        else {
                            respValidate.destroy()
                            .then(() => res.status(200).json({message: "Element de la liste annulé"}))
                            .catch(next)
                        }
                    })
            }}
        })}
    })
}