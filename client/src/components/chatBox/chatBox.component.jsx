import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import io from 'socket.io-client';

//importing custom components
import Aside from './aside/aside.component';
import ChatArea from './chatArea/chatArea.component';

//importing context
import SocketContext from '../../context/socket.context';

//importing services
import { server } from '../../services/services';
import { REGISTER, CHAT } from '../../services/socket.events';

//impotying context
import ChattingWith from './chattingWith.context';

//importing actions
import { updateChatList } from '../../actions/actions';

const ChatBox = () => {
    const [socket, setSocket] = useState(null);
    const [chattingWith, setChattingWith] = useState(null);
    const userId = useSelector(state => state.user._id);
    const dispatch = useDispatch();
    /*
        current chat user is the current user you are chatting with
    */

    useEffect(() => {

        if (!socket) {
            setSocket(new io(server));
        }
        else {
            userId && socket.emit(REGISTER, userId);
            socket.on(CHAT, chatListUpdate);
        }

        return () => {
            socket?.off(CHAT, chatListUpdate);
        }
    }, [setSocket, socket, userId]);

    const chatListUpdate = useCallback(() => {
        if (dispatch && userId) {
            dispatch(updateChatList(userId));
        }
    }, [dispatch, userId]);

    return (
        <SocketContext.Provider value={socket}>
            <ChatBoxContainer className="chatbox">
                <ChattingWith.Provider value={{ chattingWith, setChattingWith }}>
                    <Aside />
                    <ChatArea />
                </ChattingWith.Provider>
            </ChatBoxContainer>
        </SocketContext.Provider>
    );
}

const ChatBoxContainer = styled.div`
    height:100%;
    width:100%;
    display:flex;
    overflow:hidden;
`;

export default ChatBox;