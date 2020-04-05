const express = require('express');
const controllers = require('./project-user-assignments.controller');
const verifyToken = require('../auth/auth.middleware');

var projectUserAssignmentsRoutes = express.Router();
/**
 * Express routes for Project User Assignments.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all project user assignments. Evaluates to `/project-user-assignments/`.
 */
projectUserAssignmentsRoutes
  .get('/', verifyToken, controllers.getAllProjectUserAssignments)
  .post('/', verifyToken, controllers.createProjectUserAssignment);

/**
 * Routes for a project user assignment by id. Evalutes to `/project-user-assignments/:assignmentId`.
 */
projectUserAssignmentsRoutes
  .get('/:assignmentId', verifyToken, controllers.getProjectUserAssignment)
  .put('/:assignmentId', verifyToken, controllers.updateProjectUserAssignment)
  .delete('/:assignmentId', verifyToken, controllers.deleteProjectUserAssignment);

  module.exports = projectUserAssignmentsRoutes;
