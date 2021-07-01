const mongoose = require('mongoose');

const pendingContactsSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'sender id is required in pending concatcs']
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'receiver id is required in pending concatcs']
    }
});

module.exports = mongoose.model('pendingContacts', pendingContactsSchema);