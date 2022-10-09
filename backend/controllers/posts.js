const db = require('../middleware/db')
const fs = require ('fs')
const bcrypt = require('bcrypt');

// Création d'un Post
async function testImage(params) {
    if (params.file !== undefined) {
        return newPost = {...params.body,
        images: `${params.protocol}://${params.get('host')}/images/posts/${params.file.filename}`}}
    else {return newPost = params.body}
}
exports.post = (req, res, next) => {
    console.log('file', req.file)
    console.log('body', req.body)
    testImage(req)
        .then((newPost) =>{
            db.Posts.create({...newPost, 'UserId' : req.auth.userId})
        })
        .then(() => res.status(200).json({ message: 'Post créé'}))
        .catch(next);
}

// Récupération Posts par User
exports.getByUserId = (req, res, next) => {
    db.Posts.findAll({
        include: [
            {
                model: db.User, 
                as : 'User',
                where: {
                    userId : req.params.id}
            }, {
                model: db.Likes,
                include: [{
                    model: db.User,
                    as: 'User',
                    attributes: ['lastName', 'firstName']}],
                as: 'Likes', 
                attributes : ['UserId']
            }],
        order: [['createdAt', 'DESC']]
    })
    // .then((posts) => res.posts.posts)
    .then((posts) => res.status(200).json({posts}))
.catch(next);
}

// Récupérer tous les posts, tri par date, inclus l'auteur + likes
exports.getAll = (req, res, next) => {
    if (!req.auth) throw res.status(401).json({message: 'Veuillez vous reconnecter'})
    db.Posts.findAll({
        include: [
            {
                model: db.User, 
                as : 'User'
            }, {
                model: db.Likes,
                include: [{
                    model: db.User,
                    as: 'User',
                    attributes: ['lastName', 'firstName']}],
                as: 'Likes', 
                attributes : ['UserId']
            }],
        order: [['createdAt', 'DESC']]
    })
    .then((posts) => res.status(200).json(posts))
    .catch(err => res.status(400).json({message: err}));
}

/* Get ID utilisateur */
async function getUserID(params) {
    const user = await db.User.scope('withHash').findOne({where: {email: params.email}});
    if (!user) throw 'erreurConnexion'
    return user.id
}

// Création d'un Like
    // Vérifie si Like/Dislike
    async function findLikeTable(params) {
        const likesValue = await db.Likes.findOne({where : {PostId : params.PostId, UserId : params.UserId }})
        return likesValue
    }

exports.postLike = (req, res, next) => {
    const likeTable = {
        'PostId' : req.body.PostId,
        'UserId' : req.auth.userId,
        'LikeDislike' : true
    }
    findLikeTable(likeTable)
        .then((like) => {
            if (!like) {
                console.log('reqboy:', likeTable);
                db.Likes.create(likeTable)
                .then(() => res.status(200).json({message : 'like ajouté'}))
                .then(next)
            } else {
                like.destroy()
                .then(() => res.status(200).json({message : 'like supprimé'}))
                .then(next)
                }
            }
        )
}

// Modifier un post
/* Récupérer Post par ID */
async function getPostById(params){
    const post = await db.Posts.findByPk(params.id)
    if(!post) {
        return res.status(401).json('non autorisé')
        } else {return post}
} 
exports.updateOne = (req, res, next) => {
    // Vérifie si postId existe dans la base 
    getPostById(req.params)
    // Vérifie si postId appartien à Id logé 
    .then((post) => {
        if(post.UserId != req.auth.userId && !req.auth.admin) {res.status(401).json('non autorisé')} 
        else {
            let newPost = {}
            console.log('file', req.file);
            if (req.file) {
                // MAJ de l'object avec req.file
                newPost = {...req.body,
                images: `${req.protocol}://${req.get('host')}/images/posts/${req.file.filename}`}
                // Suppression de l'ancienne image
                if (post.images) {
                    console.log(post.images);
                    const filename = post.images.split('/images/posts/')[1]
                    fs.unlink(`images/posts/${filename}`, () => {
                    })
                }
            } else {newPost = {...req.body}}   
            // Update La BDD 
            Object.assign(post, newPost)
            post.save()
            .then(() => res.status(201).json({message : "Modification effectuée"}))
        }
    })
    .catch(next)
}

// Supprimer un post
exports.deleteOne = (req, res, next) => {
    // Vérifie si postId existe dans la base 
    getPostById(req.params)
        // Vérifie si postId appartien à Id logé 
        .then((post) => {
            if(post.UserId != req.auth.userId && !req.auth.admin) {res.status(401).json('non autorisé')} else {
                // Suppression de l'image
                if (req.file) {const filename = post.images.split('/images/posts/')[1]
                fs.unlink(`images/posts/${filename}`, () => {
                })}
                // Update La BDD
                post.destroy()
            }
        })
        .then(() => res.status(201).json({message : "Supression effectuée"}))
        .catch(next)
}