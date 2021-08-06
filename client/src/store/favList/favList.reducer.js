import { UPDATE_FAVOURITE_LIST, REMOVE_FAVOURITE_LIST } from "./favList.actionTypes";

const initialState = [];

const favContactReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_FAVOURITE_LIST: return action.payload;
        case REMOVE_FAVOURITE_LIST: return initialState;
        default: return state;
    }
}

export default favContactReducer;