const router = require('express').Router();

const { createUser, deleteUser, updateUser, getUser, searchUser, getUserById } = require('../../controllers/user.controller');
const { createTokens } = require('../../auth/controller/auth.controller');

router
    .route('/')
    .get(getUser, createTokens)
    .post(createUser, createTokens)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/search')
    .get(searchUser);

router
    .route('/findById')
    .get(getUserById);

module.exports = router;