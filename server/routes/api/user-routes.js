const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  saveBook,
  saveGame,
  deleteBook,
  deleteGame,
  savePicture,
  saveUserBio,
  saveFriend,
  saveLike,
  deleteFriend,
  saveMusic,
  deleteMusic,
  saveMovie,
  deleteMovie,
  login,
  addBookLike,
  addMusicLike,
  addMovieLike,
  addGameLike,
  saveUserReview,
  saveUserRating,
  addNotification,
  deleteNotification
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');
const auth = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/signup').get(getAllUsers).post(createUser);

router.route('/books').get(getAllUsers).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:id').get(getSingleUser);

router.route('/find/:username').get(getSingleUser);

router.route('/books/:id').delete(authMiddleware, deleteBook).put(addBookLike);

router.route('/games').get(getAllUsers).post(createUser).put(authMiddleware, saveGame);

router.route('/games/:id').delete(authMiddleware, deleteGame).put(addGameLike);;

router.route('/music/:id').delete(authMiddleware, deleteMusic).put(addMusicLike);;

router.route('/movies/:id').delete(authMiddleware, deleteMovie).put(addMovieLike);;

router.route('/music').get(getAllUsers).put(authMiddleware, saveMusic);

router.route('/picture').get(getAllUsers).put(authMiddleware, savePicture);

router.route('/user-bio').get(getAllUsers).put(authMiddleware, saveUserBio);

router.route('/movies').get(getAllUsers).put(authMiddleware, saveMovie);

router.route('/user-review').get(getAllUsers).put(authMiddleware, saveUserReview);

router.route('/user-rating').get(getAllUsers).put(authMiddleware, saveUserRating);

router.route('/likes').get(getAllUsers).put(authMiddleware, saveLike);

router.route('/friends').put(authMiddleware, saveFriend);

router.route('/friends/:id').delete(authMiddleware, deleteFriend);

router.route('/notifications').put(addNotification);

router.route('/notifications/:id').delete(deleteNotification);


module.exports = router;
