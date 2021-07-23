function peerserver(app, server) {
    var ExpressPeerServer = require('peer').ExpressPeerServer;
    var options = {
        debug: true
    }
    app.use('/peerjs', ExpressPeerServer(server, options));
}

export default peerserver;
