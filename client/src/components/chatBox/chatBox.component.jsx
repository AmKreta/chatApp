import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import io from 'socket.io-client';
import Peer from 'peerjs';

//importing custom components
import Aside from './aside/aside.component';
import ChatArea from './chatArea/chatArea.component';

//importing context
import SocketContext from '../../context/socket.context';
import PeerContext from '../../context/peer.context';

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
    //only for responsiveness
    const [showAside, setShowAside] = useState(true);
    const userId = useSelector(state => state.user._id);
    const dispatch = useDispatch();


    const peer = useMemo(() => new Peer(), []);
    const [peerId, setPeerId] = useState();

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

    //for setting peer-id
    useEffect(() => {
        peer?.on('open', function (id) {
            setPeerId(id);
        });
    }, [peer]);

    //for attaching event handlers to socket
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
        <PeerContext.Provider value={{ peer, peerId }}>
            <SocketContext.Provider value={socket}>
                <ChatBoxContainer className="chatbox">
                    <ChattingWith.Provider value={{ chattingWith, setChattingWith }}>
                        <Aside {...{ showAside, setShowAside }} />
                        {/*setcall will be used in header */}
                        <ChatArea setCall={setCall} showAside={showAside} />
                        {
                            (call.callFrom && call.callTo) && <Call callFrom={call.callFrom} callTo={call.callTo} type={call.type} setCall={setCall} />
                        }
                    </ChattingWith.Provider>
                </ChatBoxContainer>
            </SocketContext.Provider>
        </PeerContext.Provider>
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