const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const likeSchema = new Schema({
  _id: {
    type: String,
  },
  mediaType: {
    type: String,
    required: true,
  }
});

const Like = model('Like', likeSchema);

module.exports = Like;