const modelsCtrl = {}
const Joi = require('joi');

// Signup utilisateur
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

// Modification utilisateur
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

// Login utilisateur
modelsCtrl.login = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
validateRequest(req, next, schema);}

// Post publication
modelsCtrl.post = (req, res, next) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        description: Joi.string().required(),
        service: Joi.string().required(),
        images: Joi.link()
});
validateRequest(req, next, schema);}

// Modification publication
modelsCtrl.putPost = (req, res, next) => {
    const schema = Joi.object({
        description: Joi.string(),
        service: Joi.string(),
        images: Joi.link()
});
validateRequest(req, next, schema);}

// Gestion like
modelsCtrl.like = (req, res, next) => {
    const schema = Joi.object({
        PostId: Joi.number().required(),
        LikeDislike: Joi.boolean().required()
});
validateRequest(req, next, schema);}

// TODO 
    // Création de la liste
modelsCtrl.todoCreate = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        visibility: Joi.string().required()        
});
validateRequest(req, next, schema);}
// Modification de la liste
modelsCtrl.todoUpdate = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string(),
        visibility: Joi.string()        
});
validateRequest(req, next, schema);}

    // Création d'un élément de la liste
modelsCtrl.elementCreate = (req, res, next) => {
    const schema = Joi.object({
        // TodoListId: Joi.number().required(),
        description: Joi.string().required()
});
validateRequest(req, next, schema);}
    // Validation/Dévalidation d'un élément
modelsCtrl.validateElement = (req, res, next) => {
    const schema = Joi.object({
        validate: Joi.boolean(),
});
validateRequest(req, next, schema);}


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