import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//importing reducers
import userReducer from './user/user.reducer';
import tokenReducer from './token/token.reducer';
import contactReducer from './contact/contact.reducer';
import chatListReducer from './chatList/chatList.reducer';
import chatReducer from './chat/chat.reducer';
import pendingListReducer from './pendingList/pendingList.reducer';
import favContactReducer from './favList/favList.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    contact: contactReducer,
    chatList: chatListReducer,
    chat: chatReducer,
    pendingList: pendingListReducer,
    favContact: favContactReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;