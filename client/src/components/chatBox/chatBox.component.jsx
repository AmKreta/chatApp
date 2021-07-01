import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import io from 'socket.io-client';

//importing custom components
import Aside from './aside/aside.component';
import ChatArea from './chatArea/chatArea.component';

//importing context
import SocketContext from '../../context/socket.context';

//importing services
import { server } from '../../services/services';

const ChatBox = () => {
    const [socket, setSocket] = useState(null);
    const userName=useSelector(state=>state.user?.userName);
    
    useEffect(() => {
        setSocket(new io(server));
    }, []);

    useEffect(()=>{
        //to add userName and socketId to server
        socket && socket.emit('addToList',userName);
    },[socket]);

    return (
        <SocketContext.Provider value={socket}>
            <ChatBoxContainer className="chatbox">
                <Aside />
                <ChatArea />
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