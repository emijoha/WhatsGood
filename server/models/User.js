const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from Book.js
const bookSchema = require('./Book');
const gameSchema = require('./Game');
const musicSchema = require('./Music');
const movieSchema = require('./Movie');
const friendSchema = require('./Friend')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      default: "https://res.cloudinary.com/dxrhczeo9/image/upload/v1594230701/l84rsrhhdsfcps2h2hsa.svg"
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedBooks: [bookSchema],

    savedGames: [gameSchema],
    
    savedMusic: [musicSchema],
    savedMovies: [movieSchema],

    friends: [friendSchema]
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
userSchema.virtual('bookCount').get(function () {
  return this.savedBooks.length;
});

userSchema.virtual('gameCount').get(function () {
  return this.savedGames.length;
});

userSchema.virtual('musicCount').get(function () {
  return this.savedMusic.length;
});

userSchema.virtual('moviesCount').get(function () {
  return this.savedMovies.length;
})

const User = model('User', userSchema);

module.exports = User;
