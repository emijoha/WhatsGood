const { Schema } = require('mongoose');

const friendSchema = new Schema(
    {
        friendUsername: {
            type: String,
        }
    }
);

module.exports = friendSchema;