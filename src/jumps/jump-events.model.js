// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const JumpEventsSchema = new Schema({
  riderMass: {
    type: Number,
    default: null
  },
  riderSpeed: {
    type: Number,
    default: null
  },
  timeStamp: {
    type: Date,
    default: null
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
module.exports = mongoose.model('JumpEventsSchema', JumpEventsSchema);
