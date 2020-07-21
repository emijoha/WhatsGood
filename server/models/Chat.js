const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const chatSchema = new Schema({
 

  _id: String,

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  lastTimeStamp: {
    type: Number,
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]

}, { _id: false });

const Chat = model('Chat', chatSchema);

module.exports = Chat;

