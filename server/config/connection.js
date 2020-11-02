const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI || 'mongodb://localhost/googlebooks', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

module.exports = mongoose.connection;
