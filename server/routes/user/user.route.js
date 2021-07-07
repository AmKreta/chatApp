const router = require('express').Router();

const {
    createUser,
    deleteUser,
    updateUser,
    getUser,
    searchUser,
    getUserById,
    getUserListById,
    addToContactRequest,
    confirmRequest,
    removeFromContact,
    cancelRequest,
    rejectRequest,
    addFavorite,
    removeFavorite
} = require('../../controllers/user.controller');


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

router
    .route('/findListById')
    .get(getUserListById);

router
    .route('/contact/sendRequest')
    .post(addToContactRequest);

router
    .route('/contact/confirmRequest')
    .put(confirmRequest);

router
    .route('/contact/removeContact')
    .put(removeFromContact);

router
    .route('/contact/cancelRequest')
    .put(cancelRequest);

router
    .route('/contact/rejectRequest')
    .put(rejectRequest);

router
    .route('/favorite')
    .put(addFavorite)
    .delete(removeFavorite);

module.exports = router;