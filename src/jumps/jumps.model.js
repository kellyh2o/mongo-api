// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const JumpsSchema = new Schema({
  name: {
    type: String,
    required: 'A name is required to create a new jump'
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
module.exports = mongoose.model('Jumps', JumpsSchema);
