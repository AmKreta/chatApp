const router = require('express').Router();

const {
    createGroup,
    getGroup,
    addAdmin,
    addMember,
    removeAdmin,
    removeMember,
    deleteGroup
} = require('../../controllers/group.controller');

router
    .route('/')
    .get(getGroup)
    .post(createGroup)
    .delete(deleteGroup);

router
    .route('/addAdmin')
    .put(addAdmin);

router
    .route('/removeAdmin')
    .put(removeAdmin);

router
    .route('/addMember')
    .put(addMember);

router
    .route('/removeMember')
    .put(removeMember);

module.exports = router;