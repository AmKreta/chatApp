const bcrypt = require('bcrypt');
const user = require('../models/user.model');

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

module.exports.updateUser = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'update' });
}

module.exports.getUser = async (req, res, next) => {
    const { userName, password } = req.query;
    try {
        const result = await user.findOne({ userName });
        const passMatch = await bcrypt.compare(password, result.password);
        if (passMatch) {
            res.locals = result;
            next();
        }
        else {
            res.status(400).json({ sucess: false, message: 'password do not match' })
        }
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

module.exports.searchUser = async (req, res, next) => {
    try {
        let { search } = req.query;
        let result = await user.find({ userName: search });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

module.exports.getUserById = async (req, rs, next) => {
    try {
        let { id } = req.query;
        let result = await user.findById({ _id: id });
        res.status(200).json({ sucess: true, payload: result });
    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}

module.exports.deleteUser = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'delete' });
}