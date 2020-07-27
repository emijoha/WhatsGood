// import user model
const { User, Book, Music, Movie, Game, Like, Notification, Comment, Chat, Message } = require('../models');

// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // get all users
  async getAllUsers(req, res) {
    const users = await User.find();
    return res.json(users);
  },

  async searchAllUsers({ params }, res) {
    console.log('searchAllUsers params: ', params);
    let firstName = params.anyname.split(' ')[0];
    let lastName = params.anyname.split(' ')[1];
    lastName === undefined ? lastName = ' ' : lastName = lastName;
    console.log('firstName: ', firstName, 'lastName: ', lastName);
    try {
      const searchedUsers = await User.find({
        $or: [
          { username: { $regex: params.anyname, $options: 'i' }},
          { firstName: { $regex: firstName, $options: 'i' }},
          { lastName: { $regex: lastName, $options: 'i' }},
          { lastName: { $regex: firstName, $options: 'i' }}
        ]
      })
      console.log('searchedUsers: ', searchedUsers);
      res.json(searchedUsers);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  // get a single user by either their id or their username
  async getSingleUser({ user = null, params }, res) {
    console.log("made it to get single user")
    console.log("params", params);
    try {
      const foundUser = await User.findOne({
        $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
      })
        .populate('savedGames')
        .populate('savedBooks')
        .populate('savedMusic')
        .populate('savedMovies')
        .populate('friends')
        .populate('savedLikes')
        .populate('notifications')
        .populate({ path: 'savedBooks', populate: { path: 'comments' } })
        .populate({ path: 'savedMovies', populate: { path: 'comments' } })
        .populate({ path: 'savedMusic', populate: { path: 'comments' } })
        .populate({ path: 'savedGames', populate: { path: 'comments' } })
        .populate('chats').populate({ path: 'chats', populate: { path: 'users' } })
        .populate({ path: 'chats', populate: { path: 'messages' } });

      if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
      }
      res.json(foundUser);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  // get all of Users friends
  // async getFriends({id}, res) {
  //   console.log("GETFRIENDS USER", user)
  //   const populateFriends = await User.findOne({
  //     _id: id
  //   })
  //   .populate('friends')

  //   res.json(populateFriends);
  // },

  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function
  async saveBook({ user, body }, res) {
    console.log(user);
    try {
      const createdBook = await Book.create(body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedBooks: createdBook._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  // remove a book from `savedBooks`
  async deleteBook({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedBooks: params.id } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },  // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
  // user comes from `req.user` created in the auth middleware function

  // remove a book from `savedBooks`
  async deleteMusic({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedMusic: params.id } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },

  async saveMusic({ user, body }, res) {
    console.log(user);
    try {
      const createdMusic = await Music.create(body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedMusic: createdMusic._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async saveMovie({ user, body }, res) {
    console.log(user);
    console.log(body);
    try {
      const createdMovie = await Movie.create(body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedMovies: createdMovie._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async saveUserReview({ body }, res) {
    // console.log('user: ', user);
    console.log('body: ', body);
    try {
      const model = body.type;
      switch (model) {
        case 'Movie':
          const newMovieReview = await Movie.findOneAndUpdate(
            { _id: body.id },
            { $set: { userReview: body.review, } },
            { new: true, runValidators: true }
          );
          console.log('newMovieReview: ', newMovieReview);
          return res.json(newMovieReview);
        case 'Book':
          const newBookReview = await Book.findOneAndUpdate(
            { _id: body.id },
            { $set: { userReview: body.review, } },
            { new: true, runValidators: true }
          );
          console.log('newBookReview: ', newBookReview);
          return res.json(newBookReview);
        case 'Music':
          const newMusicReview = await Music.findOneAndUpdate(
            { _id: body.id },
            { $set: { userReview: body.review, } },
            { new: true, runValidators: true }
          );
          console.log('newMusicReview: ', newMusicReview);
          return res.json(newMusicReview);
        default:
          const newGameReview = await Game.findOneAndUpdate(
            { _id: body.id },
            { $set: { userReview: body.review, } },
            { new: true, runValidators: true }
          );
          console.log('newGameReview: ', newGameReview);
          return res.json(newGameReview);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async saveUserRating({ body }, res) {
    console.log('body: ', body);
    try {
      const model = body.type;
      switch (model) {
        case 'Movie':
          const newMovieRating = await Movie.findOneAndUpdate(
            { _id: body.id },
            { $set: { userRating: body.userRating, } },
            { new: true, runValidators: true }
          );
          console.log('newMovieRating: ', newMovieRating);
          return res.json(newMovieRating);
        case 'Book':
          const newBookRating = await Book.findOneAndUpdate(
            { _id: body.id },
            { $set: { userRating: body.userRating, } },
            { new: true, runValidators: true }
          );
          console.log('newBookRating: ', newBookRating);
          return res.json(newBookRating);
        case 'Music':
          const newMusicRating = await Music.findOneAndUpdate(
            { _id: body.id },
            { $set: { userRating: body.userRating, } },
            { new: true, runValidators: true }
          );
          console.log('newMusicRating: ', newMusicRating);
          return res.json(newMusicRating);
        default:
          const newGameRating = await Game.findOneAndUpdate(
            { _id: body.id },
            { $set: { userRating: body.userRating, } },
            { new: true, runValidators: true }
          );
          console.log('newGameRating: ', newGameRating);
          return res.json(newGameRating);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async saveFriend({ user, body }, res) {
    console.log("BODY", body);
    try {
      console.log("SAVE FRIEND");
      console.log("USER", user);
      // check to see if friend document already exist
      // if it does, add friend to user
      // if not, create friend, then add to user 

      // const newFriend = await Friend.create(body);
      // console.log("newFriend id", newFriend._id);

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { friends: body._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async deleteFriend({ user, params }, res) {
    console.log(" delete friend user", user);
    console.log(" delete friend params", params);
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { friends: params.id } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    console.log("updatedUser", updatedUser)
    return res.json(updatedUser);
  },

  async deleteMedia({ user, params }, res) {
    console.log(user);
    console.log(params);

    try {
      const model = params.type;
      switch (model) {
        case 'Movie':
          const deletedMovie = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedMovies: params.id } },
            { new: true }
          );
          if (!deletedMovie) {
            return res.status(404).json({ message: "Couldn't find user with this id!" });
          }
          return res.json(deletedMovie);
        case 'Book':
          const deletedBook = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: params.id } },
            { new: true }
          );
          if (!deletedBook) {
            return res.status(404).json({ message: "Couldn't find user with this id!" });
          }
          return res.json(deletedBook);
        case 'Music':
          const deletedMusic = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedMusic: params.id } },
            { new: true }
          );
          if (!deletedMusic) {
            return res.status(404).json({ message: "Couldn't find user with this id!" });
          }
          return res.json(deletedMusic);
        case 'Game':
          const deletedGame = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedGames: params.id } },
            { new: true }
          );
          if (!deletedGame) {
            return res.status(404).json({ message: "Couldn't find user with this id!" });
          }
          return res.json(deletedGame);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async deleteMovie({ user, params }, res) {
    console.log(user);
    console.log(params);
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedMovies: params.id } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
  },


  async savePicture({ user, body }, res) {
    console.log("hey there");
    console.log(body);

    try {

      console.log(user);

      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { picture: body.image } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async saveUserBio({ user, body }, res) {
    try {
      console.log('user: ', user, 'body: ', body);
      const updatedBio = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { bio: body.bioText } },
        { new: true, runValidators: true }
      );
      return res.json(updatedBio);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  // ADD function to save and delete video games
  async saveGame({ user, body }, res) {
    console.log("THE USER:", user);
    console.log("THE BODY:", body);
    try {
      const createdGame = await Game.create(body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedGames: createdGame._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async saveLike({ user, body }, res) {
    console.log("THE USER:", user);
    console.log("THE BODY:", body);
    try {
      const createdLike = await Like.create(body);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedLikes: createdLike._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async addBookLike({ body }, res) {

    try {


      let newLikeTotal = body.likes + 1;

      const updatedBook = await Book.findOneAndUpdate(
        { _id: body._id },
        { $set: { likes: newLikeTotal } },
        { new: true, runValidators: true }
      );
      return res.json(updatedBook);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async addMusicLike({ body }, res) {

    try {


      let newLikeTotal = body.likes + 1;

      const updatedMusic = await Music.findOneAndUpdate(
        { _id: body._id },
        { $set: { likes: newLikeTotal } },
        { new: true, runValidators: true }
      );
      return res.json(updatedMusic);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async addGameLike({ body }, res) {

    try {


      let newLikeTotal = body.likes + 1;

      const updatedGame = await Game.findOneAndUpdate(
        { _id: body._id },
        { $set: { likes: newLikeTotal } },
        { new: true, runValidators: true }
      );
      return res.json(updatedGame);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async addMovieLike({ body }, res) {

    try {


      let newLikeTotal = body.likes + 1;

      const updatedMovie = await Movie.findOneAndUpdate(
        { _id: body._id },
        { $set: { likes: newLikeTotal } },
        { new: true, runValidators: true }
      );
      return res.json(updatedMovie);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },

  async deleteGame({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedGames: params.id } },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    console.log("AFTER DELETE?", updatedUser);
    return res.json(updatedUser);
  },

  // create notifications and update the user that the notification is pushed to
  async addNotification({ body }, res) {
    console.log("notification body", body);
    try {
      const notification = await Notification.create(
        { likerUsername: body.likerUsername, title: body.title, type: body.type, mediaId: body.mediaId, mediaType: body.mediaType, followerId: body.followerId, comment: body.comment });
      const updatedUser = await User.findOneAndUpdate(
        { _id: body.ownerId },
        { $addToSet: { notifications: notification._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }

  },

  async deleteNotification({ params }, res) {
    console.log("delete notification params", params);
    try {
      const deletedNotification = await Notification.deleteOne(
        { _id: params.id },
        { new: true, runValidators: true }
      );
      return res.json(deletedNotification)
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async addMovieComment({ body }, res) {

    try {
      const newComment = await Comment.create(
        { content: body.content, commenterUsername: body.commenterUsername }
      );
      const updatedMovie = await Movie.findOneAndUpdate(
        { _id: body.mediaId },
        { $addToSet: { comments: newComment._id } },
        { new: true, runValidators: true }
      );
      return res.json(newComment);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async addBookComment({ body }, res) {

    try {
      const newComment = await Comment.create(
        { content: body.content, commenterUsername: body.commenterUsername }
      );
      const updatedBook = await Book.findOneAndUpdate(
        { _id: body.mediaId },
        { $addToSet: { comments: newComment._id } },
        { new: true, runValidators: true }
      );
      return res.json(newComment);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async addMusicComment({ body }, res) {

    try {
      const newComment = await Comment.create(
        { content: body.content, commenterUsername: body.commenterUsername }
      );
      const updatedMovie = await Music.findOneAndUpdate(
        { _id: body.mediaId },
        { $addToSet: { comments: newComment._id } },
        { new: true, runValidators: true }
      );
      return res.json(newComment);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async addGameComment({ body }, res) {

    try {
      const newComment = await Comment.create(
        { content: body.content, commenterUsername: body.commenterUsername }
      );
      const updatedGame = await Game.findOneAndUpdate(
        { _id: body.mediaId },
        { $addToSet: { comments: newComment._id } },
        { new: true, runValidators: true }
      );
      return res.json(newComment);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async saveMessage({ body }, res) {

    try {
      const newMessage = await Message.create(
        {
          senderId: body.senderId,
          senderName: body.senderName,
          senderPicture: body.senderPicture,
          timeStamp: body.timeStamp,
          createdAt: body.createdAt,
          messageText: body.messageText
        }
      );

      // , $set: { lastTimeStamp: body.timeStamp }
      const updatedChat = await Chat.findOneAndUpdate(
        { _id: body.chatId },
        { $addToSet: { messages: newMessage._id } },
        { new: true, runValidators: true }
      );
      return res.json(updatedChat);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  //   async saveChat({ body }, res) {

  //     try {

  //       const newChat = await Chat.create(
  //         { 
  //           users: body.users  
  //         }
  //       );

  //       const updatedUsers = await User.updateMany(
  //         { _id: { $in: [body.users[0], body.users[1]] } },
  //         { $addToSet: { chats: newChat._id }}
  //       );

  //       return res.json(updatedUsers);

  //     } catch (err) {
  //       console.log(err);
  //       return res.status(400).json(err);
  //     }
  //   }
  // };

  // senderId: newMessageObject.senderId, 
  // senderName: newMessageObject.senderName,
  // senderPicture: newMessageObject.senderPicture,
  // timeStamp: newMessageObject.timeStamp,
  // createdAt: newMessageObject.createdAt,
  // messageText: newMessageObject.messageText,  
  // users: [newChatState.receiverId, newMessageObject.senderId]



  async saveChat({ body }, res) {

    try {

      const newMessage = await Message.create(
        {
          senderId: body.senderId,
          senderName: body.senderName,
          senderPicture: body.senderPicture,
          timeStamp: body.timeStamp,
          createdAt: body.createdAt,
          messageText: body.messageText
        }
      );

      const newChat = await Chat.create(

        {
          _id: body._id,
          users: body.users,
          lastTimeStamp: newMessage.timeStamp,
          messages: [newMessage._id]
        }
      );

      const updatedUsers = await User.updateMany(
        { _id: { $in: [body.users[0], body.users[1]] } },
        { $addToSet: { chats: newChat._id } }
      );

      return res.json(updatedUsers);

    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },


  async makeFavorite({ body }, res) {
    console.log('body: ', body);
    try {
      const model = body.type;
      switch (model) {
        case 'Movie':
          const newMovieFavorite = await Movie.findOneAndUpdate(
            { _id: body.id },
            { $set: { userFavorite: body.favorite, } },
            { new: true, runValidators: true }
          );
          console.log('newMovieFavorite: ', newMovieFavorite);
          return res.json(newMovieFavorite);
        case 'Book':
          const newBookFavorite = await Book.findOneAndUpdate(
            { _id: body.id },
            { $set: { userFavorite: body.favorite, } },
            { new: true, runValidators: true }
          );
          console.log('newBookFavorite: ', newBookFavorite);
          return res.json(newBookFavorite);
        case 'Music':
          const newMusicFavorite = await Music.findOneAndUpdate(
            { _id: body.id },
            { $set: { userFavorite: body.favorite, } },
            { new: true, runValidators: true }
          );
          console.log('newMusicFavorite: ', newMusicFavorite);
          return res.json(newMusicFavorite);
        default:
          const newGameFavorite = await Game.findOneAndUpdate(
            { _id: body.id },
            { $set: { userFavorite: body.favorite, } },
            { new: true, runValidators: true }
          );
          console.log('newGameFavorite: ', newGameFavorite);
          return res.json(newGameFavorite);
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  async getGame({ params }, res) {
    // console.log("made it to get single user")
    // console.log("params", params);
    const foundGame = await Game.findOne(
      { _id: params.id }).populate('comments');

    if (!foundGame) {
      return res.status(400).json({ message: 'Cannot find a game with this id!' });
    }

    res.json(foundGame);
  },
  async getBook({ params }, res) {
    // console.log("made it to get single user")
    // console.log("params", params);
    const foundBook = await Book.findOne(
      { _id: params.id }).populate('comments');

    if (!foundBook) {
      return res.status(400).json({ message: 'Cannot find a book with this id!' });
    }

    res.json(foundBook);
  },
  async getMusic({ params }, res) {
    // console.log("made it to get single user")
    // console.log("params", params);
    const foundMusic = await Music.findOne(
      { _id: params.id }).populate('comments');

    if (!foundMusic) {
      return res.status(400).json({ message: 'Cannot find any music with this id!' });
    }

    res.json(foundMusic);
  },
  async getMovie({ params }, res) {
    // console.log("made it to get single user")
    // console.log("params", params);
    const foundMovie = await Movie.findOne(
      { _id: params.id }).populate('comments');

    if (!foundMovie) {
      return res.status(400).json({ message: 'Cannot find a movie with this id!' });
    }

    res.json(foundMovie);
  }
};