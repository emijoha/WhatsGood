const { Schema, model } = require('mongoose');

const friendSchema = new Schema({
    id: {
        type: String,
    }
});

const Friend = model("Friend", friendSchema)
module.exports = Friend;