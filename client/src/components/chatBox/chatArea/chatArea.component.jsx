import React, { useState } from 'react';
import styled from 'styled-components';

//importing custom components
import Header from './header/header.component';
import Main from './main/main.component';
import Footer from './footer/footer.component';

const ChatArea = () => {
    return (
        <ChatAreaContainer className="chatArea">
            <Header />
            <Main  />
            <Footer />
        </ChatAreaContainer>
    );
};

const ChatAreaContainer = styled.div`
    height:100%;
    flex-grow: 1;
    border-left:1px solid #ccc;
    &>header{
        height:10%;
    }
    &>main{
        height:80%;
    }
    &>footer{
        height:10%;
    }
`;

export default ChatArea;