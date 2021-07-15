//importing acions
import { UPDATE_CHAT_LIST, DELETE_CHAT_LIST } from './chatList.actionTypes';

const initialState = [];

const chatListReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHAT_LIST:
            return action.payload;
        case DELETE_CHAT_LIST:
            return [];
        default:
            console.log(`${action.type} is not set for chatListReducer`);
            return state;
    }
}

export default chatListReducer;