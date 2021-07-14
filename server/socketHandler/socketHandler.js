//importing events
const {
    REGISTER,
    CHAT
} = require('./socket.events');

//storing userId and socket.id of all users like { user._id => socket.id };
const connectedUsers = new Map();

function socketHandler(io) {
    io.on('connection', socket => {

        socket.on(REGISTER, userId => {
            connectedUsers.set(userId, socket.id);
            console.log(connectedUsers);
        });

        socket.on(CHAT, userId => {
            let emitToUserId = connectedUsers.get(userId);
            emitToUserId && io.to(emitToUserId).emit(CHAT);
        });

        socket.on('disconnect', function () {
            connectedUsers.delete()
        });

    });
}

module.exports = socketHandler;