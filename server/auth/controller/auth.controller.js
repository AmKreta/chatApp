const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const token = require('../model/token.model');

const createTokens = (payload) => {
    const access_token_secret = crypto.randomBytes(64).toString('hex');
    const refresh_token_secret = crypto.randomBytes(64).toString('hex');
    const access_token = jwt.sign(payload, access_token_secret, { expiresIn: process.env.TOKEN_EXPIRES_IN });
    const refresh_token = jwt.sign(payload, access_token_secret, { expiresIn: process.env.TOKEN_EXPIRES_IN });
    return {
        access_token_secret,
        access_token,
        refresh_token_secret,
        refresh_token
    };
}


module.exports.createTokens = async (req, res, next) => {
    const { _doc } = { ...res.locals };

    const {
        access_token_secret,
        access_token,
        refresh_token_secret,
        refresh_token
    } = createTokens(_doc);

    await token.findOneAndUpdate({ user_id: res.locals._id }, {
        access_token_secret,
        refresh_token_secret,
        recently_issued_acess_token: access_token,
        user_id: res.locals._id
    }, { upsert: true });

    res.status(200).json({ sucess: true, payload: { ..._doc, tokens: { access_token, refresh_token } } });
}

module.exports.verifyTokens = (req, res, next) => {
    //token is in form 'Bearer Token'
    const access_token = req.headers['Authorization'].split(' ')[1];
    //check if it matches
        //next()
    //check if it's the last issued token
        //check if refresh token matches
            //issue new access and refresh token and add to res.locals
            //next()
        //next({refresh token doesn't match})
    //next(access token is expired)        
        
}

module.exports.deleteTokens = (req, res, next) => {

}
