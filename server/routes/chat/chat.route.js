const router = require('express').Router();

const { createChat, getChat } = require('../../controllers/chat.controller');

router
    .route('/')
    .get(getChat)
    .post(createChat);

module.exports=router;    