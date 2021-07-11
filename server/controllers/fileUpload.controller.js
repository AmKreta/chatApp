//version 4 of uuid
//use v4() to generate uid
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const { json } = require('express');

const renameAndUpload = (file) => {
    //renames and uploades files in server

    try {
        //moving file
        file.mv(uploadPath, err => {
            if (err) {
                throw err;
            }
        })
    }
    catch (err) {

    }
}

module.exports.fileUploader = (req, res, next) => {
    try {

        if (!req.files) {
            next({ status: 400, message: 'send atleast one file' });
        }

        const file = req.files.file;
        let rootDirectory = path.join(__dirname, '../');
        let newFileName = `${uuidv4()}-${file.name}`;
        let uploadPath = path.resolve(rootDirectory, 'static', newFileName);

        //moving file in static folder
        file.mv(uploadPath, err => {
            if (err) {
                throw err;
            }
            else {
                let url = `${process.env.SERVER_ADDRESS}/${newFileName}`;
                res.status(200).json({ sucess: true, url });
            }
        });

    }
    catch (err) {
        next({ status: 400, message: err.message, stack: err.stack });
    }
}