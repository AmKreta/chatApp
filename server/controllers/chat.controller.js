const chat = require('../models/chat.model');
const createIdentifire = require('../util/createIdentifire.util');

const mongoose = require('mongoose');

/*

*/

//use express file loader here
module.exports.createChat = async (req, res, next) => {
    try {
        const { sentBy, receivedBy, media, text, type } = req.body;
        //this identifire will help us fetch last chat in mongodb
        const identifire = createIdentifire(sentBy, receivedBy);
        let result = await chat.create({
            sentBy,
            receivedBy,
            text,
            media,
            type,
            identifire
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

module.exports.getChatList = async (req, res, next) => {
    //get id's of all users 
    //count unread messages
    //store last message
    const { userId } = req.query;

    const getUsersChat = {
        $match: {
            $or: [
                { sentBy: new mongoose.Types.ObjectId(userId) },
                { receivedBy: new mongoose.Types.ObjectId(userId) }
            ]
        }
    };

    const getLastChat = {
        $group: {
            _id: '$identifire',
            unread: {
                $sum: {
                    $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0]
                }
            },
            lastChat: {
                $last: '$$ROOT'
            }
        }
    }

    try {
        let result = await chat.aggregate([getUsersChat, getLastChat]);
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

module.exports.markAsRead = async (req, res, next) => {
    try {
        let { ids: unreadChatIds, userId, chattingWithId } = req.body;
        await chat.updateMany({ _id: { $in: unreadChatIds } }, { $set: { status: 'read' } });
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

module.exports.getChatList