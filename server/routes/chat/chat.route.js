const router = require('express').Router();

const { createChat, getChat, getChatList, markAsRead } = require('../../controllers/chat.controller');

router
    .route('/')
    .get(getChat)
    .post(createChat);

router
    .route('/getChatList')
    .get(getChatList);

router
    .route('/markAsRead')
    .put(markAsRead);

module.exports = router;