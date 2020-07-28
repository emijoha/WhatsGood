const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: false
    },
    lastName: {
      type: String,
      required: false
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
    bio: {
      type: String,
      required: false,
      default: ''
    },
    // set savedBooks to be an array of data that adheres to the bookSchema
    savedMedia: [
      {
        type: Schema.Types.ObjectId,
        ref: "Media"
      }
    ],
    savedBooks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Media"
      }
    ],

    savedGames: [
      {
        type: Schema.Types.ObjectId,
        ref: "Media"
      }
    ],

    savedMusic: [
      {
        type: Schema.Types.ObjectId,
        ref: "Media"
      }
    ],
    savedMovies: [
      {
        type: Schema.Types.ObjectId,
        ref: "Media"
      }
    ],
    savedLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like"
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification"
      }
    ]
    ,
    chats: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chat"
      }
    ]
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
