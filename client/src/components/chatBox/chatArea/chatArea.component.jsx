import React from 'react';
import styled from 'styled-components';

//importing custom components
import Header from './header/header.component';
import Main from './main/main.component';
import Footer from './footer/footer.component';

const ChatArea = ({ setCall, showAside }) => {
    return (
        <ChatAreaContainer className={`chatArea ${showAside ? 'inactive' : null}`}>
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
    @media only screen and ( max-width : 700px ){
        width:100%;
        transition:.3s ease-in-out;

        &.inactive{
            opacity:.5;
            filter: grayscale(100%);
        }
    }
`;

export default ChatArea;