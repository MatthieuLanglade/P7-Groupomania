const express = require('express');
const userRoutes = require('./routes/user')
const postsRoutes = require('./routes/posts')
const todoRoutes = require('./routes/todolist')
const configPlanningRoutes = require('./routes/configPlanning')
const path = require('path')
const app = express();
var helmet = require('helmet');

// Middlewares

// Analyse du corps des requêtes
  app.use(express.json());
// Helmet
  app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
// Autorisations des requêtes
  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
  });
// Routes
  app.use('/api/auth', userRoutes);
  app.use('/api/posts', postsRoutes);
  app.use('/images', express.static(path.join(__dirname, 'images')));
  app.use('/api/todolist', todoRoutes);
  app.use('/api/configPlanning/', configPlanningRoutes);

module.exports = app;