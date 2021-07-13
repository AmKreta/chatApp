const router = require('express').Router();

const { createChat, getChat, getChatList } = require('../../controllers/chat.controller');

router
    .route('/')
    .get(getChat)
    .post(createChat);

router
    .route('/getChatList')
    .get(getChatList);

module.exports = router;