import { UPDATE_PENDING_LIST, REMOVE_PENDING_LIST } from './pendingList.actionTypes';

const initialState = [];

const pendingListReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PENDING_LIST: console.log( action.payload) ; return action.payload;
        case REMOVE_PENDING_LIST: return [];
        default: return state;
    }
}

export default pendingListReducer;