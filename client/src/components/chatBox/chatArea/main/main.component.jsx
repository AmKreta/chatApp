import React, { useContext, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

//importing context
import ChattingWithContext from '../../chattingWith.context';
import SocketContext from '../../../../context/socket.context';

//importing custom components
import Chat from './chats/chats.component';

//importing services
import { get_chat, put_markasRead } from '../../../../services/services';
import { CHAT } from '../../../../services/socket.events';

//importing actions
import { updateChatList } from '../../../../actions/actions';

const Main = ({ chat, setChat }) => {
    const userId = useSelector(state => state.user._id);
    const { chattingWith } = useContext(ChattingWithContext);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchChat = () => {
            //async request creates bugs
            if (chattingWith?._id && userId) {
                axios({
                    method: 'get',
                    url: get_chat,
                    params: {
                        userId,
                        chattingWithId: chattingWith._id
                    }
                })
                    .then(res => {
                        setChat(res.data.payload);
                    })
                    .catch(err => {
                        alert('unable to fetch chat');
                        console.log(err);
                    })
            }
        }
        fetchChat();
        if (socket) {
            socket.on(CHAT, fetchChat);
        }
        return () => socket?.off(CHAT, fetchChat);
    }, [chattingWith?._id, userId, setChat, socket]);

    useEffect(() => {
        //effect for marking unread messages as read if chattinfWith._id changes
        if (chattingWith?._id && chat?.length && dispatch) {
            //checking if last message sent by user current user is chatting with
            if (chat[chat.length - 1].sentBy === chattingWith._id) {

                const unreadMessageIds = chat
                    .filter(item => item.status === 'delivered')
                    .map(item => item._id);

                unreadMessageIds?.length && axios({
                    method: 'put',
                    url: put_markasRead,
                    data: {
                        ids: unreadMessageIds,
                        userId,
                        chattingWithId: chattingWith._id
                    }
                })
                    .then(res => {
                        let newChat = res.data.payload;
                        setChat(newChat);
                        dispatch(updateChatList(userId));
                        socket.emit(CHAT, chattingWith._id);
                    })
                    .catch(err => {
                        alert('unable to fetch chat');
                        console.log(err);
                    });
            }
        }
    }, [chattingWith?._id, chat, userId, dispatch, setChat, socket]);

    return (
        <AnimatePresence>
            <StyledMain>
                {
                    chattingWith && chat.map(item => <Chat key={item._id} {...item} />)
                }
            </StyledMain>
        </AnimatePresence>
    );
};

const StyledMain = styled(motion.main)`
    max-height:80%;
    overflow-y:scroll;;
    padding:5px ${props => props.theme.spacing};
`;

export default Main;