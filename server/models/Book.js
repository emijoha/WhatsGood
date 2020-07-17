const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const bookSchema = new Schema({
  authors: [
    {
      type: String,
    },
  ],
  description: {
    type: String,
    required: false,
  },
  // saved book id from GoogleBooks
  mediaId: {
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
  userReview: {
    type: String,
    required: false,
    default: ''
  },
  userRating: {
    type: Number,
    required: false,
    default: 0
  }
});

const Book = model('Book', bookSchema);

module.exports = Book;
