const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const notificationSchema = new Schema({
  likerUsername: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  },
  type: {
      type: String,
      required: true
  }
});

const Notification = model('Notification', notificationSchema);

module.exports = Notification;