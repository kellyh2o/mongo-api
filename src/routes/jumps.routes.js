const controllers = require('../controllers/jumps.controller');
const express = require('express');

var jumpsRoutes = express.Router();
/**
 * Express routes for Jumps.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all jumps. Evaluates to `/locations/:locationId:/jumps`.
 */
jumpsRoutes.get('/', controllers.getAllJumps).post('/', controllers.createJump);

/**
 * Routes for a jump by id. Evalutes to `/locations/:locationId/jumps/:jumpId`.
 */
jumpsRoutes
  .get('/:jumpId', controllers.getJump)
  .put('/:jumpId', controllers.updateJump)
  .delete('/:jumpId', controllers.deleteJump);

  module.exports = jumpsRoutes;
