const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const mediaSchema = new Schema({
    authors: [
        {
          type: String,
        },
      ],
      artist: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      // saved book id from GoogleBooks
      mediaId: {
        type: String,
        required: true,
      },
      mediaType: {
        type: String,
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
      comments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment'
        }
      ],
      image: {
        type: String,
        required: false,
      },
    
      preview: {
        type: String,
        required: false,
      },
    developer: {
        type: String,
      },
      link: {
        type: String,
      },
      title: {
        type: String,
        required: false,
      },  
      actors: {
        type: String,
        required: false
      },
      director: {
        type: String,
        required: false
      },
      genre: {
        type: String,
        required: false
      },
      plot: {
        type: String,
        required: false,
      },
      rated: {
        type: String,
        required: false
      },
      released: {
        type: String,
        required: false
      },
      runtime: {
        type: String,
        required: false
      },
      userId: {
        type: String,
      },
      username: {
        type: String,
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
      },
      userFavorite: {
        type: Boolean,
        default: false
      }
    
});

const Media = model('Media', mediaSchema);

module.exports = Media;