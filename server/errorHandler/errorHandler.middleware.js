module.exports = (err, req, res, next) => {
    res.status(err.status).json({
        sucess: false,
        payload: {
            err: err.message,
            stack: err.stack
        }
    });
};