const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  saveBook,
  saveGame,
  deleteBook,
  deleteGame,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/books').get(getAllUsers).post(createUser).put(authMiddleware, saveBook);

router.route('/games').get(getAllUsers).post(createUser).put(authMiddleware, saveGame);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

router.route('/books/:id').delete(authMiddleware, deleteBook);

router.route('/games/:id').delete(authMiddleware, deleteGame);

module.exports = router;
