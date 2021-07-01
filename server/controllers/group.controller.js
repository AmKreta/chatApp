module.exports.createGroup = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'create group' });
}

module.exports.getGroup = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'get group' });
}

module.exports.addAdmin = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'add admin' });
}

module.exports.removeAdmin = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'remove admin' });
}

module.exports.addMember = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'add member' });
}

module.exports.removeMember = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'remove member' });
}

module.exports.deleteGroup = (req, res, next) => {
    res.status(200).json({ sucess: true, fun: 'delete group' });
}