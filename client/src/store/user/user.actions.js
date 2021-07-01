import { UPDATE_CURRENT_USER, DELETE_CURRENT_USER } from "./user.actionTypes";

export const updateCurrentUser = (payload) => {
    return { type: UPDATE_CURRENT_USER, payload };
};

export const deleteCurrentUser = () => {
    return { type: DELETE_CURRENT_USER };
};

