//importing events
const {
    REGISTER,
    CHAT,
    IS_ONLINE
} = require('./socket.events');

//storing userId and socket.id of all users like { user._id => socket.id };
const connectedUsers = new Map();

function socketHandler(io) {
    io.on('connection', socket => {

        socket.on(REGISTER, userId => {
            connectedUsers.set(userId, socket.id);
            console.log(connectedUsers);
        });

        socket.on(CHAT, ({ sentBy, receivedBy }) => {
            let emitToUserId = connectedUsers.get(receivedBy);
            emitToUserId && io.to(emitToUserId).emit(CHAT, { sentBy });
        });

        socket.on(IS_ONLINE, ({ userId }) => {
            //to check if a user is online
            const isOnline = connectedUsers.has(userId);
            socket.emit(IS_ONLINE, isOnline);
        });

        socket.on('disconnect', function () {
            //disconnect handler
            //manually removing from map
            let userId;

        });

    });
}

module.exports = socketHandler;