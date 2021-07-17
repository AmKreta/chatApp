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
import { REGISTER, CHAT, CALL } from '../../services/socket.events';

//impotying context
import ChattingWith from './chattingWith.context';

//importing actions
import { updateChatList } from '../../actions/actions';

//importing reusable components
import Call from '../../reusableComponents/call/call.component';

const ChatBox = () => {
    const [socket, setSocket] = useState(null);
    const [chattingWith, setChattingWith] = useState(null);
    const [call, setCall] = useState({ callFrom: null, callTo: null, type: null });
    const userId = useSelector(state => state.user._id);
    const dispatch = useDispatch();
    /*
        current chat user is the current user you are chatting with
    */

    const chatListUpdate = useCallback(() => {
        if (dispatch && userId) {
            dispatch(updateChatList(userId));
        }
    }, [dispatch, userId]);

    const onCall = useCallback((data) => {
        const { callFrom, callTo, type } = data;
        if (callFrom && type && callTo) {
            setCall({ callFrom, type, callTo });
        }
    }, [setCall]);

    useEffect(() => {

        if (!socket) {
            setSocket(new io(server));
        }
        else {
            userId && socket.emit(REGISTER, userId);
            socket.on(CHAT, chatListUpdate);
            socket.on(CALL, onCall)
        }

        return () => {
            socket?.off(CHAT, chatListUpdate);
            socket?.off(CALL, onCall);
        }
    }, [setSocket, socket, userId, chatListUpdate, onCall]);

    return (
        <SocketContext.Provider value={socket}>
            <ChatBoxContainer className="chatbox">
                <ChattingWith.Provider value={{ chattingWith, setChattingWith }}>
                    <Aside />
                    {/*setcall will be used in header */}
                    <ChatArea setCall={setCall} />
                    {
                        (call.callFrom && call.callTo) && <Call callFrom={call.callFrom} callTo={call.callTo} type={call.type} setCall={setCall} />
                    }
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
    position:relative;
`;

export default ChatBox;