const bcrypt = require('bcrypt');
const { update } = require('../models/user.model');
const user = require('../models/user.model');


/*
    @method POST
    @url    /api/user
    @access public
*/
module.exports.createUser = async (req, res, next) => {
    try {
        const { userName, phoneNo, password } = req.body;
        const result = await user.create({ userName, phoneNo, password });
        res.locals = result;
        next();
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}


/*
    @method PUT
    @url    /api/user
    @access public
*/
module.exports.updateUser = async (req, res, next) => {
    const { userName, phoneNo, status, dp } = req.body;
    try {
        let result = await user.findOneAndUpdate({ phoneNo }, { userName, phoneNo, status, dp }, { new: true });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}


/*
    @method POST
    @url    /api/user
    @access public
*/
module.exports.getUser = async (req, res, next) => {
    console.log('amk');
    const { userName, password } = req.query;
    try {
        const result = await user.findOne({ userName });
        if (result) {
            const passMatch = await bcrypt.compare(password, result.password);
            if (passMatch) {
                res.locals = result;
                next();
            }
            else {
                res.status(400).json({ sucess: false, message: 'password do not match' });
            }
        }
        else {
            res.status(400).json({ sucess: false, message: "user doesn't exists" });
        }
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}


/*
    @method POST
    @url    /api/user
    @access public
*/
module.exports.searchUser = async (req, res, next) => {
    try {
        let { search } = req.query;
        let result = await user.find({ userName: { '$regex': '.*' + search + '.*' } });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}


/*
    @method POST
    @url    /api/user/findById
    @access public
*/
module.exports.getUserById = async (req, res, next) => {
    try {
        let { id } = req.query;
        let result = await user.findById({ _id: id }, { password: false });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

/*
    @method POST
    @url    /api/user/findListById
    @access public
*/
module.exports.getUserListById = async (req, res, next) => {
    try {
        let { ids } = req.query;
        let result = await user.find({
            _id: {
                "$in": ids
            }
        }, { password: false, contacts: false, fav: false, blocked: false, pendingContacts: false });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

/*
    @method POST
    @url    /api/user/contact/sendRequest
    @access public
*/
module.exports.addToContactRequest = async (req, res, next) => {
    //add to pending request of both sender and receiver
    try {
        let { senderId, receiverId } = req.body;
        //start transaction
        let result = await user.findByIdAndUpdate({ _id: senderId }, {
            $addToSet: {
                pendingContacts: {
                    userId: receiverId,
                    type: 'sent'
                }
            }
        }, { new: true });
        await user.findByIdAndUpdate({ _id: receiverId }, {
            $addToSet: {
                pendingContacts: {
                    userId: senderId,
                    type: 'received'
                }
            }
        });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}


/*
    @method PUT
    @url    /api/user/contact/confirmRequest
    @access public
*/
module.exports.confirmRequest = async (req, res, next) => {
    //confirm or delete request
    //modify both sender and receiver 
    try {
        let { userId, requestId } = req.body;
        //requestId sent request and userId received request

        let result = await user.findByIdAndUpdate({ _id: userId }, {
            $pull: {
                pendingContacts: {
                    userId: requestId,
                    type: 'received'
                }
            },
            $addToSet: { contacts: requestId }
        }, { new: true });
        await user.findByIdAndUpdate({ _id: requestId }, {
            $pull: {
                pendingContacts: {
                    userId,
                    type: 'sent'
                }
            },
            $addToSet: { contacts: userId }
        });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

/*
    @method PUT
    @url    /api/user/contact/rejectRequest
    @access public
*/
module.exports.rejectRequest = async (req, res, next) => {
    try {
        let { userId, requestId } = req.body;
        //requestId sent request and userId received request

        let result = await user.findByIdAndUpdate({ _id: userId }, {
            $pull: {
                pendingContacts: {
                    userId: requestId,
                    type: 'received'
                }
            }
        }, { new: true });
        await user.findByIdAndUpdate({ _id: requestId }, {
            $pull: {
                pendingContacts: {
                    userId,
                    type: 'sent'
                }
            }
        });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

/*
    @method PUT
    @url    /api/user/contact/cancelRequest
    @access public
*/
module.exports.cancelRequest = async (req, res, next) => {
    try {
        let { userId, requestId } = req.body;
        //requestId sent request and userId received request

        let result = await user.findByIdAndUpdate({ _id: userId }, {
            $pull: {
                pendingContacts: {
                    userId: requestId,
                    type: 'sent'
                }
            }
        }, { new: true });
        await user.findByIdAndUpdate({ _id: requestId }, {
            $pull: {
                pendingContacts: {
                    userId,
                    type: 'received'
                }
            }
        });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

/*
    @method PUT
    @url    /api/user/contact/removeContact
    @access public
*/
module.exports.removeFromContact = async (req, res, next) => {
    try {
        let { userId, contactId } = req.body;
        //remove form fav and contact list
        let result = await user.findByIdAndUpdate({ _id: userId }, {
            $pull: {
                contacts: contactId,
                fav: contactId
            }
        }, { new: true });
        await user.findByIdAndUpdate({ _id: contactId }, {
            $pull: {
                contacts: userId,
                fav: userId
            }
        });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}


/*
    @method POST
    @url    /api/user
    @access public
*/
module.exports.addFavorite = async (req, res, next) => {
    try {
        let { userId, favId } = req.body;
        let result = await user.findByIdAndUpdate({ _id: userId }, {
            $addToSet: {
                fav: favId
            }
        }, { new: true });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

/*
    @method POST
    @url    /api/user
    @access public
*/
module.exports.removeFavorite = async (req, res, next) => {
    try {
        let { userId, favId } = req.body;
        let result = await user.findByIdAndUpdate({ _id: userId }, {
            $pull: {
                fav: favId
            }
        }, { new: true });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}



/*
    @method POST
    @url    /api/user
    @access public
*/
module.exports.deleteUser = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'delete' });
}