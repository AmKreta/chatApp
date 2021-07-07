import { UPDATE_CONTACTS, DELETE_CONTACTS } from "./contact.actionTypes"

//importing utilities
import axios from 'axios';

//importing services
import { get_userListById } from '../../services/services';

export const updateContacts = (payload) => {

    return dispatch => {
        axios({
            method: 'get',
            url: get_userListById,
            params: { ids: payload }
        })
            .then(res => dispatch({ type: UPDATE_CONTACTS, payload: res.data.payload }))
            .catch(err => {
                console.log('could not fetch contacts, try again');
                alert(err);
            })
    };
}

export const deleteContacts = () => {
    return { type: DELETE_CONTACTS };
}

