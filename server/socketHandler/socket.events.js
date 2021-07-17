//register user
module.exports.REGISTER = 'register';

//contact events
module.exports.CONTACT_REQUEST = 'contactRequest';
module.exports.CONTACT_CONFIRM_REQUEST = 'confirmRequest';
module.exports.CONTCT_REJECT_REQUEST = 'rejectRequest';
module.exports.CONTACT_REMOVE = 'removeContact';
module.exports.CONTACT_LIKE = 'likecontact';
module.exports.CONTACT_DISLIKE = 'dislikeContact';

//chat events
module.exports.CHAT = 'chat'; //update both chat and chatlist on this event
module.exports.TYPING = 'typing';

//user events
module.exports.IS_ONLINE = 'isOnline';

//call events
module.exports.CALL = 'call';
module.exports.ACCEPT_CALL = 'acceptCall';
module.exports.DECLINE_CALL = 'declineCall';
module.exports.END_CALL = 'endCall';
