const { fileUploader } = require('../../controllers/fileUpload.controller');

const router = require('express').Router();

//for reading files

const fileUpload = require('express-fileupload');
router.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

router
    .route('/')
    .post(fileUploader);

module.exports = router;