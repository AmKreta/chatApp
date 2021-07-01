import { UPDATE_TOKENS, DELETE_TOKENS } from './token.actionTypes';

const initialState = {

};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TOKENS:
            let newState = { ...state, ...action.payload };
            localStorage.setItem('token', JSON.stringify(newState));
            return newState;
        case DELETE_TOKENS:
            localStorage.removeItem('token');
            return {};
        default:
            console.log(`${action.type} is not set for token reducer`);
            return state;
    }
};

export default tokenReducer;