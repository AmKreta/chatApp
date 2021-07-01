const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    SuperAdmin: {
        type: mongoose.Schema.Types.ObjectId
    },
    Admins: [mongoose.Schema.Types.ObjectId],
    members: [mongoose.Schema.Types.ObjectId],
    blocked: [mongoose.Schema.Types.ObjectId],
    restricted: [mongoose.Schema.Types.ObjectId],
    dp: {
        type: String,
        default: 'https://lwlies.com/wp-content/uploads/2017/04/avatar-2009-1108x0-c-default.jpg'
    }
});

module.exports = mongoose.model('group', groupSchema);