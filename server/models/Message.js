const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    senderId: {
        type: String
      },
    senderName: {
        type: String
      },
    senderPicture: {
        type: String
      },
    timeStamp: {
        type: Number
      },
    createdAt: {
        type: String,
      },
    messageText: {
          type: String
        }
      
});

const Message = model('Message', messageSchema);

module.exports = Message;