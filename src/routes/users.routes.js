const controllers = require('../controllers/users.controller');
const express = require('express');

var usersRoutes = express.Router();
/**
 * Express routes for Users.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all users. Evaluates to `/users/`.
 */
usersRoutes.get('/', controllers.getAllUsers).post('/', controllers.createUser);

/**
 * Routes for a user by id. Evalutes to `/users/:userId`.
 */
usersRoutes
  .get('/:userId', controllers.getUser)
  .put('/:userId', controllers.updateUser)
  .delete('/:userId', controllers.deleteUser);

  module.exports = usersRoutes;
