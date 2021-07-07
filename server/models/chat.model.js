const mongoose = require('mongoose');

const chatSchema = {
    sentBy: {
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
        //store url here
        type: String
    },
    status: {
        type: String,
        enum: ['sent', 'read'],
        default: 'sent'
    }
}

module.exports = mongoose.model('chat', chatSchema);

