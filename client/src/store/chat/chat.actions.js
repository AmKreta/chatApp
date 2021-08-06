//importing actions
import { UPDATE_CHAT, DELETE_CHAT, PUSH_CHAT, FETCH_CHAT } from './chat.actionTypes';

//importing services
import { get_chat, put_markasRead, post_chat } from '../../services/services';

import axios from 'axios';

export const fetchChat = ({ userId, chattingWithId }) => {
    return dispatch => {
        axios({
            method: 'get',
            url: get_chat,
            params: { userId, chattingWithId }
        })
            .then(res => {
                dispatch({ type: FETCH_CHAT, payload: res.data.payload });
                const chatDiv = document.querySelector('#chatAreaMain');
                chatDiv.scrollTop = chatDiv.scrollHeight;
            })
            .catch(err => {
                alert('unable to fetch chat');
                console.log(err);
            })
    }
}

export const updateChat = (newChats) => {
    return { type: UPDATE_CHAT, payload: newChats };
}

export const pushChat = ({ userId, chattingWithId, message, media, cb }) => {
    return dispatch => {
        axios({
            method: 'post',
            url: post_chat,
            data: {
                sentBy: userId,
                receivedBy: chattingWithId,
                text: message,
                media: media?.url,
                type: media?.type
            }
        })
            .then(res => {
                dispatch({ type: PUSH_CHAT, payload: res.data.payload });
                const chatDiv = document.querySelector('#chatAreaMain');
                chatDiv.scrollTop = chatDiv.scrollHeight;
                cb && cb();
            })
            .catch(err => {
                alert('unable to send message !');
                console.log(err);
            })
    };
}

export const markAsRead = ({ userId, chattingWithId, unreadMessageIds, cb }) => {
    return dispatch => {
        axios({
            method: 'put',
            url: put_markasRead,
            data: {
                ids: unreadMessageIds,
                userId,
                chattingWithId: chattingWithId
            }
        })
            .then(res => {
                dispatch({ type: UPDATE_CHAT, payload: res.data.payload });
                //any callback
                cb && cb();
            })
            .catch(err => {
                alert('unable to mark chat as read !');
                console.log(err);
            })
    }
}

export const deleteChat = () => {
    return { type: DELETE_CHAT };
}