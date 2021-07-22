
//identifire used in get chat list route for creating mongodb identifire
function createIdentifire(id1, id2) {
    return id1 > id2 ? `${id1}-${id2}` : `${id2}-${id1}`;
}

module.exports = createIdentifire;