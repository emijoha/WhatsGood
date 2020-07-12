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
  saveFriend,
  deleteFriend,
  saveMusic,
  deleteMusic,
  saveMovie,
  deleteMovie,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/signup').get(getAllUsers).post(createUser);

router.route('/books').get(getAllUsers).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:id').get(getSingleUser);

router.route('/find/:username').get(getSingleUser);

router.route('/books/:id').delete(authMiddleware, deleteBook);

router.route('/games').get(getAllUsers).post(createUser).put(authMiddleware, saveGame);

router.route('/games/:id').delete(authMiddleware, deleteGame);

router.route('/music/:id').delete(authMiddleware, deleteMusic);

router.route('/movies/:id').delete(authMiddleware, deleteMovie);

router.route('/music').get(getAllUsers).put(authMiddleware, saveMusic);

router.route('/picture').get(getAllUsers).put(authMiddleware, savePicture);

router.route('/movies').get(getAllUsers).put(authMiddleware, saveMovie);

router.route('/friends').put(authMiddleware, saveFriend);

router.route('/friends/:id').delete(authMiddleware, deleteFriend);

module.exports = router;
