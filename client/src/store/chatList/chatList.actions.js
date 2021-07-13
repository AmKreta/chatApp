//importing axios
import axios from 'axios';

//importing services
import { get_ChatList } from '../../services/services';

//importing actiontypes
import { UPDATE_CHAT_LIST, DELETE_CHAT_LIST } from './chatList.actionTypes';

export const updateChatList = (userId) => {
    return dispatch => {
        axios({
            method: 'get',
            url: get_ChatList,
            params: { userId }
        })
            .then(res => dispatch({ type: UPDATE_CHAT_LIST, payload: res.data.payload }))
            .catch(err => {
                console.log(err);
                alert("unable to fetch chatList");
            })
    }
}

export const deleteChatList = () => {
    return { type: DELETE_CHAT_LIST };
}