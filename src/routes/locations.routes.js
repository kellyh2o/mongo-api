const controllers = require('../controllers/locations.controller');
const express = require('express');

var locationsRoutes = express.Router();
/**
 * Express routes for Locations.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all locations. Evaluates to `/locations/`.
 */
locationsRoutes.get('/', controllers.getAllLocations).post('/', controllers.createLocation);

/**
 * Routes for a location by id. Evalutes to `/locations/:locationId`.
 */
locationsRoutes
  .get('/:locationId', controllers.getLocation)
  .put('/:locationId', controllers.updateLocation)
  .delete('/:locationId', controllers.deleteLocation);

  module.exports = locationsRoutes;
