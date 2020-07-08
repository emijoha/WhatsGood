const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const musicSchema = new Schema({
  artist: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  // saved book id from GoogleBooks
  musicId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
});

module.exports = musicSchema;
