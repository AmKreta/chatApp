import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//importing reducers
import userReducer from './user/user.reducer';
import tokenReducer from './token/token.reducer';
import contactReducer from './contact/contact.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer,
    contact: contactReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;