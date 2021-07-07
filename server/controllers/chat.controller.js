const chat = require('../models/chat.model');

//use express file loader here
module.exports.createChat = async (req, res, next) => {
    try {
        const { senderId, receiverId } = req.body;
        let media = req.files;
        let text = req.body.text;

        let result = await chat.insert({
            sentBy: senderId,
            receivedBy: receiverId,
            text: text,
            media: media
        });

        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

module.exports.getChat = async (req, res, next) => {
    //also add pagination
    try {
        const { senderId, receiverId } = req.body;
        let result = await chat.find({
            '$or': [
                {
                    sentBy: senderId,
                    receivedBy: receiverId
                },
                {
                    receivedBy: senderId,
                    sentBy: receiverId
                }
            ]
        });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {

    }
}