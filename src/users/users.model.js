// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const UsersSchema = new Schema({
  firstName: {
    type: String,
    required: 'A user first name is required to create a new user'
  },
  lastName: {
    type: String,
    required: 'A user last name is required to create a new user'
  },
  email: {
    type: String,
    required: 'A user email is required to create a new user'
  },
  password: {
    type: String,
    required: 'A user password is required to create a new user'
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
module.exports = mongoose.model('Users', UsersSchema);
