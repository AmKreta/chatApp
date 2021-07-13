import { updateCurrentUser, deleteCurrentUser } from '../store/user/user.actions';
import { updateTokens, deleteTokens } from '../store/token/token.actions';
import { updateContacts, deleteContacts } from '../store/contact/contact.actions';
import { updateChatList, deleteChatList } from '../store/chatList/chatList.actions';


export {
    updateCurrentUser,
    deleteCurrentUser,
    updateTokens,
    deleteTokens,
    updateContacts,
    deleteContacts,
    updateChatList,
    deleteChatList
};