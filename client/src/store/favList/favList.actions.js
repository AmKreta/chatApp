import { UPDATE_FAVOURITE_LIST, REMOVE_FAVOURITE_LIST } from "./favList.actionTypes";
import axios from 'axios';

import { get_userListById } from '../../services/services';

export const updateFavouriteList = favList => {
    return dispatch => {
        axios({
            method: 'get',
            url: get_userListById,
            params: { ids: favList }
        })
        .then(res => dispatch({ type: UPDATE_FAVOURITE_LIST, payload: res.data.payload }))
            .catch(err => {
                console.log('could not fetch fav contacts, try again');
                alert(err);
            });
    }
}

export const removeFavouriteList = () => {
    return { type: REMOVE_FAVOURITE_LIST };
}