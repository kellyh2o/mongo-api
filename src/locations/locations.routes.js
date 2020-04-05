const express = require('express');
const controllers = require('./locations.controller');
const verifyToken = require('../auth/auth.middleware');

var locationsRoutes = express.Router();
/**
 * Express routes for Locations.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all locations. Evaluates to `/locations/`.
 */
locationsRoutes
  .get('/', verifyToken, controllers.getAllLocations)
  .post('/', verifyToken, controllers.createLocation);

/**
 * Routes for a location by id. Evalutes to `/locations/:locationId`.
 */
locationsRoutes
  .get('/:locationId', verifyToken, controllers.getLocation)
  .put('/:locationId', verifyToken, controllers.updateLocation)
  .delete('/:locationId', verifyToken, controllers.deleteLocation);

  module.exports = locationsRoutes;
