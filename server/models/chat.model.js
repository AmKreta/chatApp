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
        enum: ['delivered', 'read'],
        default: 'delivered'
    },
    type: {
        type: String,
        enum: ['text', 'gif', 'image', 'audio', 'video', 'document', 'location'],
        default: 'text'
    }
}

module.exports = mongoose.model('chat', chatSchema);

