const connectedUsers = new Map();

function socketHandler(io) {
    io.on('connection', socket => {
        console.log(`${socket.id} connected`);

        socket.on('addToList', userName => {
            connectedUsers.set(userName, socket.id);
        });

        socket.on('privateMessage', ({ from, to, message }) => {
            //first save in database
            //then emit to other user
            
        });

    });
}

module.exports = socketHandler;