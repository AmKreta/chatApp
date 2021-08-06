import axios from 'axios';

//importing action types
import { UPDATE_PENDING_LIST, REMOVE_PENDING_LIST } from './pendingList.actionTypes';

//importing services
import { get_userListById } from '../../services/services';


export const updatePendingList = (pendingContacts) => {
    return dispatch => {
        axios({
            method: 'get',
            url: get_userListById,
            params: { ids: pendingContacts.map(item => item.userId) }
        })
            .then(res => dispatch({ type: UPDATE_PENDING_LIST, payload: res.data.payload }))
            .catch(err => {
                console.log('could not fetch contacts, try again');
                alert(err);
            });
    };
}

export const removePendintList = () => {
    return { dispatch: REMOVE_PENDING_LIST };
}


