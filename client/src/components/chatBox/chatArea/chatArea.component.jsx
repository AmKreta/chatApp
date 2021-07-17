import React from 'react';
import styled from 'styled-components';

//importing custom components
import Header from './header/header.component';
import Main from './main/main.component';
import Footer from './footer/footer.component';

const ChatArea = ({ setCall }) => {
    return (
        <ChatAreaContainer className="chatArea">
            {/* setCall defined in parent component , toggles call popup */}
            <Header setCall={setCall} />
            <Main />
            <Footer />
        </ChatAreaContainer>
    );
};

const ChatAreaContainer = styled.div`
    height:100%;
    width:calc(100% - 340px);
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