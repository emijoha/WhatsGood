const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const movieSchema = new Schema({
  // director: [
  //   {
  //     type: String,
  //     required: false
  //   },
  // ],
  // description: {
  //   type: String,
  //   required: false,
  // },
  // saved book id from GoogleBooks
  movieId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  // link: {
  //   type: String,
  //   required: false
  // },
  title: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: false
  }
});

module.exports = movieSchema;
