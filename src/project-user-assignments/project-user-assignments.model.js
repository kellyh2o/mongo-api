// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const ProjectUserAssignmentsSchema = new Schema({
  projectId: {
    type: String,
    required: 'A project id is required to create a new project-user assignment'
  },
  userId: {
    type: String,
    required: 'A user id is required to create a new project-user assignment'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    default: null
  },
  updatedAt: {
    type: Date,
    default: null
  },
  updatedBy: {
    type: String,
    default: null
  }
});

// Expose the collections functions for use in our controller
module.exports = mongoose.model('ProjectUserAssignments', ProjectUserAssignmentsSchema);
