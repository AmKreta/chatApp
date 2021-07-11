const router = require('express').Router();

const userRouter = require('./user/user.route');
const groupRouter = require('./group/group.routes');
const uploadRouter = require('./fileUpload/fileUpload.routes')
const chatRouter = require('./chat/chat.route');

router.use('/user', userRouter);
router.use('/group', groupRouter);
router.use('/upload', uploadRouter);
router.use('/chat', chatRouter);

module.exports = router;