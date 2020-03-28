const controllers = require('../controllers/projects.controller');
const express = require('express');

var projectsRoutes = express.Router();
/**
 * Express routes for Projects.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all projects. Evaluates to `/projects/`.
 */
projectsRoutes.get('/', controllers.getAllProjects).post('/', controllers.createProject);

/**
 * Routes for a project by id. Evalutes to `/projects/:projectId`.
 */
projectsRoutes
  .get('/:projectId', controllers.getProject)
  .put('/:projectId', controllers.updateProject)
  .delete('/:projectId', controllers.deleteProject);

  module.exports = projectsRoutes;
