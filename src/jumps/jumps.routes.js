const express = require('express');
const controllers = require('./jumps.controller');
const verifyToken = require('../auth/auth.middleware');

var jumpsRoutes = express.Router();
/**
 * Express routes for Jumps.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all jumps. Evaluates to `/locations/:locationId:/jumps`.
 */
jumpsRoutes
  .get('/', verifyToken, controllers.getAllJumps)
  .post('/', verifyToken, controllers.createJump);

/**
 * Routes for a jump by id. Evalutes to `/locations/:locationId/jumps/:jumpId`.
 */
jumpsRoutes
  .get('/:jumpId', verifyToken, controllers.getJump)
  .put('/:jumpId', verifyToken, controllers.updateJump)
  .delete('/:jumpId', verifyToken, controllers.deleteJump);

  module.exports = jumpsRoutes;
