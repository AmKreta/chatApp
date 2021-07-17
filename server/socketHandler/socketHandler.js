//importing events
const {
    REGISTER,
    CHAT,
    IS_ONLINE,
    CALL,
    ACCEPT_CALL,
    DECLINE_CALL,
    END_CALL
} = require('./socket.events');

//storing userId and socket.id of all users like { user._id => socket.id };
const connectedUsers = new Map();

//for storing {socket.id=>uiser._id}
const connectedUsersSocket = new Map();

function socketHandler(io) {
    io.on('connection', socket => {

        //handling user registration events
        socket.on(REGISTER, userId => {
            //adding in a map object to keep track
            connectedUsers.set(userId, socket.id);
            connectedUsersSocket.set(socket.id, userId);
            //emmitting event which tells users that this user is online
            io.emit(IS_ONLINE, { userId, online: true });
            console.log(connectedUsers);
        });

        //for handling chat
        socket.on(CHAT, ({ sentBy, receivedBy }) => {
            let emitToUserId = connectedUsers.get(receivedBy);
            emitToUserId && io.to(emitToUserId).emit(CHAT, { sentBy });
        });

        //for checking if online
        socket.on(IS_ONLINE, ({ userId }) => {
            //to check if a user is online
            const isOnline = connectedUsers.has(userId);
            socket.emit(IS_ONLINE, { userId, online: isOnline });
        });

        //for handling calls
        socket.on(CALL, ({ callFrom, callTo, type }) => {
            const emitToUserId = connectedUsers.get(callTo);
            emitToUserId && io.to(emitToUserId).emit(CALL, { callFrom, callTo, type });
        });

        socket.on(END_CALL, ({ callFrom, callTo }) => {
            //emit to whoever is left on call
            //ie if a cut the call emit to nb
            const emitToUserId = connectedUsersSocket.get(sockket.id) === callFrom
                ? connectedUsers.get(callTo)
                : connectedUsers.get(callFrom);
            emitToUserId && io.to(emitToUserId).emit(END_CALL);
        });

        socket.on(DECLINE_CALL, ({ callFrom, callTo }) => {
            //emit to whoever is left on call
            //ie if a cut the call emit to nb
            const emitToUserId = connectedUsersSocket.get(socket.id) === callFrom
                ? connectedUsers.get(callTo)
                : connectedUsers.get(callFrom);
            emitToUserId && io.to(emitToUserId).emit(DECLINE_CALL);
        });

        socket.on(ACCEPT_CALL, ({ callFrom, callTo }) => {
            //only the person receiving the call can accept the call
            //so when he picks up he emits ACCEPT event
            //now ACCEPT wiil be emitted to the initiater
            const emitToUserId = connectedUsers.get(callFrom);
            emitToUserId && io.to(emitToUserId).emit(ACCEPT_CALL);
        });

        socket.on('disconnect', function () {
            //disconnect handler
            //manually removing from map
            let userId = connectedUsersSocket.get(socket.id);
            connectedUsersSocket.delete(socket.id);
            connectedUsers.delete(userId);
            //emmitting event which tells other users that this user is offline 
            io.emit(IS_ONLINE, { userId, online: false });
        });

    });
}

module.exports = socketHandler;