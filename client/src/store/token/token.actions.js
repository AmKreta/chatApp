import { UPDATE_TOKENS, DELETE_TOKENS } from './token.actionTypes';

export const updateTokens = (payload) => {
    return { type: UPDATE_TOKENS, payload };
}

export const deleteTokens = () => {
    return { type: DELETE_TOKENS };
}

