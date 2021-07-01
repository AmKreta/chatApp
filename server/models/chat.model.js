const mongoose = require('mongoose');

const chatSchema = {
    sentby: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'sent by id is required in chat Schema ']
    },
    receivedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'received by id is required in chat Schema ']
    },
    text: {
        type: String
    },
    media: {
        type: String
    }
}

module.exports = mongoose.model('chat', chatSchema);

