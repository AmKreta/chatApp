const router = require('express').Router();

const userRouter = require('./user/user.route');
const groupRouter = require('./group/group.routes');

router.use('/user', userRouter);
router.use('/group', groupRouter);

module.exports = router;