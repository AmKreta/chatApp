const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    access_token_secret: {
        type: String,
        required: [true, 'access_token_secret is required in token schema']
    },
    refresh_token_secret: {
        type: String,
        required: [true, 'refresh_token_secret is required in token schema']
    },
    current_acess_token: {
        type: String,
        required: [true, 'current_access_token is required in token schema']
    },
    user_id: {
        type: String,
        required: [true, 'user_id is required in token schema'],
        unique: true
    }
});

module.exports = mongoose.model('token', tokenSchema);