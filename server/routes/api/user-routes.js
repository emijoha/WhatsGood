const router = require('express').Router();
const {
  createUser,
  getAllUsers,
  getSingleUser,
  saveBook,
  savePicture,
  deleteBook,
  saveMusic,
  deleteMusic,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/signup').get(getAllUsers).post(createUser);

router.route('/books').get(getAllUsers).put(authMiddleware, saveBook);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/:username').get(getSingleUser);

router.route('/books/:id').delete(authMiddleware, deleteBook);

router.route('/music/:id').delete(authMiddleware, deleteMusic);

router.route('/music').get(getAllUsers).put(authMiddleware, saveMusic);

router.route('/picture').get(getAllUsers).put(authMiddleware, savePicture);

module.exports = router;
