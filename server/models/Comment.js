const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  commenterUsername: {
      type: String,
      required: true
  }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;