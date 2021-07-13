const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
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
    },
    identifire: {
        type: String,
        required: [true, 'identifire is required in mongoose schema']
    }
}, { timestamps: true });
module.exports = mongoose.model('chat', chatSchema);

