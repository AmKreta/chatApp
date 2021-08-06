import React, { useContext, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

//importing context
import ChattingWithContext from '../../chattingWith.context';
import SocketContext from '../../../../context/socket.context';

//importing custom components
import Chat from './chats/chats.component';

//importing services
import { server } from '../../../../services/services';
import { CHAT } from '../../../../services/socket.events';

//importing actions
import { updateChatList, fetchChat, markAsRead } from '../../../../actions/actions';

const Main = () => {
    const userId = useSelector(state => state.user._id);
    const chat = useSelector(state => state.chat);
    const { chattingWith } = useContext(ChattingWithContext);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch();

    useEffect(() => {

        const getChat = (data) => {
            if (chattingWith?._id && userId) {
                if (typeof (data) === "undefined") {
                    //run for the first time
                    dispatch(fetchChat({ userId, chattingWithId: chattingWith._id }));
                }
                else if (data?.sentBy === chattingWith._id) {
                    //socket event
                    //will reun only if event is emitted bt the chattinhWith._id
                    dispatch(fetchChat({ userId, chattingWithId: chattingWith._id }));
                }
            }
        }

        if (socket && userId && chattingWith?._id) {
            getChat();
            socket.on(CHAT, getChat);
        }

        return () => socket?.off(CHAT, getChat);

    }, [chattingWith?._id, userId, socket, dispatch]);

    useEffect(() => {
        //effect for marking unread messages as read if chattinfWith._id changes
        if (chattingWith?._id && chat?.length && dispatch) {
            //checking if last message sent by user current user is chatting with
            if (chat[chat.length - 1].sentBy === chattingWith._id) {

                const unreadMessageIds = chat
                    .filter(item => item.status === 'delivered')
                    .map(item => item._id);

                unreadMessageIds?.length && dispatch(markAsRead({
                    userId,
                    chattingWithId: chattingWith._id,
                    unreadMessageIds,
                    cb: () => {
                        dispatch(updateChatList(userId));
                        socket.emit(CHAT, { sentBy: userId, receivedBy: chattingWith._id });
                    }
                }));
            }
        }
    }, [chattingWith?._id, chat, userId, dispatch, socket]);

    return (
        <AnimatePresence>
            <StyledMain id='chatAreaMain'>
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
    /*background-image:url('${server}/default-chat-bg.jpg');
    background-size:cover;
    background-position: center center;
    background-color:rgba(0,0,0,.2);
    background-blend-mode: darken;*/
`;

export default Main;