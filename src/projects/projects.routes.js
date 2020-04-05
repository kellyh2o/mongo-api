const express = require('express');
const controllers = require('./projects.controller');
const verifyToken = require('../auth/auth.middleware');

var projectsRoutes = express.Router();
/**
 * Express routes for Projects.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all projects. Evaluates to `/projects/`.
 */
projectsRoutes
  .get('/', verifyToken, controllers.getAllProjects)
  .post('/', verifyToken, controllers.createProject);

/**
 * Routes for a project by id. Evalutes to `/projects/:projectId`.
 */
projectsRoutes
  .get('/:projectId', verifyToken, controllers.getProject)
  .put('/:projectId', verifyToken, controllers.updateProject)
  .delete('/:projectId', verifyToken, controllers.deleteProject);

  module.exports = projectsRoutes;
