const rateLimite = require('express-rate-limit');

module.exports = rateLimite({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limite l'ip à 10 requêtes (ici, pour 15 minutes)
	standardHeaders: true,
})