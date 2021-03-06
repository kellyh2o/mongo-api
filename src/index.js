const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const authRoutes = require('./auth/auth.routes');
const jumpsRoutes = require('./jumps/jumps.routes');
const jumpEventsRoutes =  require('./jumps/jump-events.routes');
const locationsRoutes = require('./locations/locations.routes');
const projectsRoutes = require('./projects/projects.routes');
const projectUserAssignmentsRoutes = require('./project-user-assignments/project-user-assignments.routes');
const projectLocationAssignmentsRoutes = require('./project-location-assignments/project-location-assignments.routes');
const usersRoutes = require('./users/users.routes');

const middleware = require('./errors/errors.middleware');

const app = express();
const port = process.env.PORT || 3001;
const logLevel = process.env.LOG_LEVEL || 'dev';

// Make connection to the db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tododb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Store the instance of db so we can listen to events.
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('Connection Successful!');
});

// Middleware - logs server requests to console
app.use(logger(logLevel));

// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Allow websites to talk to our API service.
app.use(cors());

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Handle routes for tasks.
app.use('/v1/auth', authRoutes);
app.use('/v1/locations', locationsRoutes);
app.use('/v1/locations/:locationId/jumps', jumpsRoutes);
app.use('/v1/locations/:locationId/jumps/:jumpId/events', jumpEventsRoutes);
app.use('/v1/projects', projectsRoutes);
app.use('/v1/project-user-assignments', projectUserAssignmentsRoutes);
app.use('/v1/project-location-assignments', projectLocationAssignmentsRoutes);
app.use('/v1/users', usersRoutes);

// Handle 404 requests
app.use(middleware.error404);

// Handle 500 requests
// applies mostly to live services
app.use(middleware.error500);

// listen on server port
app.listen(port, function() {
  console.log(`Running on port: ${port}...`);
});
