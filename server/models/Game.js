const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const gameSchema = new Schema({
  developer: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  // saved book id from API
  gameId: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: String,
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  }
});

const Game = model('Game', gameSchema);

module.exports = Game;