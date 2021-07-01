import { UPDATE_CURRENT_USER, DELETE_CURRENT_USER } from "./user.actionTypes";

const initialState = {

};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CURRENT_USER:
            let newState = { ...state, ...action.payload };
            localStorage.setItem('user', JSON.stringify(newState));
            return newState;
        case DELETE_CURRENT_USER:
            localStorage.removeItem('user');
            return {};
        default:
            console.log(`${action.type} is not set for userReducer`);
            return state;
    }
}

export default userReducer;

