const modelsCtrl = {}
const Joi = require('joi');

/* 1. Utilisateurs */
    /* 1.1 SignUp Utilisateur */
modelsCtrl.signup = (req, res, next) => {
    const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    service: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    profilPicture: Joi.link(),
    birthday: Joi.date(),
});
validateRequest(req, next, schema);}

    /* 1.2 Modification Utilisateur */
modelsCtrl.putUser = (req, res, next) => {
    const schema = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    service: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    confirmPassword: Joi.string().valid(Joi.ref('password')),
    profilPicture: Joi.link(),
    birthday: Joi.date(),
});
validateRequest(req, next, schema);}

    /* 1.3 Login Utilisateur */
modelsCtrl.login = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
validateRequest(req, next, schema);}


/* 2. Posts */
    /* 2.1 Post Publication */
modelsCtrl.post = (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        description: Joi.string().required(),
        service: Joi.string().required(),
        images: Joi.link()
});
validateRequest(req, next, schema);}

    /* 2.2 Post Modification */
modelsCtrl.putPost = (req, res, next) => {
    const schema = Joi.object({
        description: Joi.string(),
        service: Joi.string(),
        images: Joi.link()
});
validateRequest(req, next, schema);}

    /* 2.3 Création/Suppression de like */
modelsCtrl.like = (req, res, next) => {
    const schema = Joi.object({
        PostId: Joi.number().required(),
        LikeDislike: Joi.boolean().required()
});
validateRequest(req, next, schema);}

/* 3. TODOLIST */
    /* 3.1 TODO Création */
modelsCtrl.todoCreate = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        visibility: Joi.string().required()        
});
validateRequest(req, next, schema);}

    /* 3.2 TODO Modification */
modelsCtrl.todoUpdate = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string(),
        visibility: Joi.string()        
});
validateRequest(req, next, schema);}

    /* 3.3 TODO - Element Création */
modelsCtrl.elementCreate = (req, res, next) => {
    const schema = Joi.object({
        description: Joi.string().required()
});
validateRequest(req, next, schema);}

    /* 3.4 TODO - Element Validation */
modelsCtrl.validateElement = (req, res, next) => {
    const schema = Joi.object({
        validate: Joi.boolean(),
});
validateRequest(req, next, schema);}

/* 4. Configuration du Planning */ 
    /* Planning - Création des Services */
    modelsCtrl.servicesCreate = (req, res, next) => {
        const schema = Joi.object({
        nom: Joi.string().required(),
    });
    validateRequest(req, next, schema);}

    /* Planning - Création des Postes */
    modelsCtrl.postesCreate = (req, res, next) => {
        const schema = Joi.object({
        nom: Joi.string().required(),
    });
    validateRequest(req, next, schema);}

    /* Planning - Création des Equipes */
    modelsCtrl.equipesCreate = (req, res, next) => {
        const schema = Joi.object({
        nom: Joi.string().required(),
    });
    validateRequest(req, next, schema);}

    /* Planning - Gestion infos Agent */

/* 5. Gestion du planning */
    /* Création WorkSchedule */ 
modelsCtrl.workScheduleCreate = (req, res, next) => {
    const schema = Joi.object({
        UserId: Joi.number().required(),
        PosteEquipeId: Joi.number().required(),
        DateTravail: Joi.date().required(),
    });
    validateRequest(req, next, schema);
}
/* Fonction: Validation du controlleur */
function validateRequest(req, next, schema) {
    const options = { 
        abortEarly: false, 
        allowUnknown: true, 
        stripUnknown: true 
    };
    const { error, value } = schema.validate(req.body, options);
    console.log('controller', req.body);
    if (error) {
        next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
        console.log(error);
    } else {
        req.body = value;
        next();
    }
}
module.exports =  modelsCtrl