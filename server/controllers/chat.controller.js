const chat = require('../models/chat.model');

/*

*/

//use express file loader here
module.exports.createChat = async (req, res, next) => {
    try {
        const { sentBy, receivedBy, media, text, type } = req.body;

        let result = await chat.create({
            sentBy,
            receivedBy,
            text,
            media,
            type
        });

        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}


/*

*/

module.exports.getChat = async (req, res, next) => {
    //also add pagination
    try {
        const { userId, chattingWithId } = req.query;
        let result = await chat.find({
            '$or': [
                {
                    sentBy: userId,
                    receivedBy: chattingWithId
                },
                {
                    receivedBy: userId,
                    sentBy: chattingWithId
                }
            ]
        });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}