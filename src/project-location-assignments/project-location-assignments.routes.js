const express = require('express');
const controllers = require('./project-location-assignments.controller');
const verifyToken = require('../auth/auth.middleware');

var projectLocationAssignmentsRoutes = express.Router();
/**
 * Express routes for Project Location Assignments.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all project location assignments. Evaluates to `/project-location-assignments/`.
 */
projectLocationAssignmentsRoutes
  .get('/', verifyToken, controllers.getAllProjectLocationAssignments)
  .post('/', verifyToken, controllers.createProjectLocationAssignment);

/**
 * Routes for a project location assignment by id. Evalutes to `/project-location-assignments/:assignmentId`.
 */
projectLocationAssignmentsRoutes
  .get('/:assignmentId', verifyToken, controllers.getProjectLocationAssignment)
  .put('/:assignmentId', verifyToken, controllers.updateProjectLocationAssignment)
  .delete('/:assignmentId', verifyToken, controllers.deleteProjectLocationAssignment);

 module.exports = projectLocationAssignmentsRoutes;
