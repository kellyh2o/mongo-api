const express = require('express');
const controllers = require('./jump-events.controller');
const verifyToken = require('../auth/auth.middleware');

var jumpEventsRoutes = express.Router();
/**
 * Express routes for Jump Events.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all jump events. Evaluates to `/locations/:locationId:/jumps/:jumpId/events`.
 */
jumpEventsRoutes
  .get('/', verifyToken, controllers.getAllJumpEvents)
  .post('/', verifyToken, controllers.createJumpEvent);

/**
 * Routes for a jump event by id. Evalutes to `/locations/:locationId/jumps/:jumpId/events/:eventId`.
 */
jumpEventsRoutes
  .get('/:eventId', verifyToken, controllers.getJumpEvent)
  .put('/:eventId', verifyToken, controllers.updateJumpEvent)
  .delete('/:eventId', verifyToken, controllers.deleteJumpEvent);

  module.exports = jumpEventsRoutes;
