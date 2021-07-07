import { UPDATE_CONTACTS, DELETE_CONTACTS } from "./contact.actionTypes"

const initialState = [];

const contactReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CONTACTS: return [...action.payload];
        case DELETE_CONTACTS: return [];
        default: console.log(`${action.type} is not set for contacts reducer`); return state;
    }
}

export default contactReducer;