import { combineReducers, createStore } from 'redux';

//importing reducers
import userReducer from './user/user.reducer';
import tokenReducer from './token/token.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    token: tokenReducer
});

const store = createStore(rootReducer);

export default store;