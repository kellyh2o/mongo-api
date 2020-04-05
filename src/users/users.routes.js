const express = require('express');
const controllers = require('./users.controller');
const verifyToken = require('../auth/auth.middleware');

var usersRoutes = express.Router();
/**
 * Express routes for Users.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all users. Evaluates to `/users/`.
 */
usersRoutes
  .get('/', verifyToken, controllers.getAllUsers)
  .post('/', verifyToken, controllers.createUser);

/**
 * Routes for the currently logged in user.
 */
usersRoutes
  .get('/me', verifyToken, controllers.getMe)
  .post('/me/update', verifyToken, controllers.updateMe);

/**
 * Routes for a user by id. Evalutes to `/users/:userId`.
 */
usersRoutes
  .get('/:userId', verifyToken, controllers.getUser)
  .put('/:userId', verifyToken, controllers.updateUser)
  .delete('/:userId', verifyToken, controllers.deleteUser);

module.exports = usersRoutes;
