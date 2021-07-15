//importing action type
import { UPDATE_CHAT, DELETE_CHAT, PUSH_CHAT, FETCH_CHAT } from './chat.actionTypes';

const initialState = [];

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CHAT: return action.payload;
        case UPDATE_CHAT: return action.payload;
        case PUSH_CHAT: return [...state, action.payload];
        case DELETE_CHAT: return [];
        default:
            console.log(`${action.type} is not set for chatReducer`);
            return state;
    }
}

export default chatReducer;