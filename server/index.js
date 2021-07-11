const path = require('path');

//importing env variables
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, 'config', 'config.env') });

//setting up express and middlewares
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

//serving static files
app.use(express.static(path.join(__dirname, 'static')));

//for reading request.body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//handling all rountes here
const routeHandler = require('./routes/routes');
app.use('/api', routeHandler);

//handling all errors from routes here
const errorHandler = require('./errorHandler/errorHandler.middleware');
app.use(errorHandler);

//connecting to db
const connectDB = require('./connectDB/connectDb');
connectDB('chatApp');

//setting up http server
const http = require('http');
const server = http.Server(app);

//init socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});
const socketHandler = require('./socketHandler/socketHandler');
socketHandler(io);

//strarting server
server.listen(process.env.PORT, () => {
    console.log(`server listeneing on port ${process.env.PORT} in ${process.env.MODE} mode`);
});

//close server on unhandeled rejections
process.on('unhandeledRejection', (err, promise) => {
    console.log(err.message);
    server.close(() => {
        process.exit("terminating the process");
    })
});