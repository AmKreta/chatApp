import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

//import logo
import DocumentLogo from './document.svg';

import TimeAgo from 'javascript-time-ago'

const timeAgo = new TimeAgo('en-US');


//for chat info use redux store user for user-info
//use chatCon
const Chat = (props) => {
    const userId = useSelector(state => state.user._id);
    return (
        <>
            <ChatContainer>
                <div className={props.sentBy === userId ? 'sent' : 'received'}>
                    <div className={`message ${props.media ? 'withMedia' : null}`}>
                        {
                            props.media && (() => {
                                switch (props.type) {
                                    case 'gif':
                                        return <img src={props.media} alt='gif' className='messageMedia' loading='lazy' />
                                    case 'image':
                                        return <img src={props.media} alt='media' className='messageMedia' loading='lazy' />
                                    case 'audio':
                                        return (
                                            <audio className='messageMedia' controls preload='none'>
                                                <source src={props.media} />
                                                audio is not supported
                                            </audio>
                                        )
                                    case 'video':
                                        return (
                                            <video className='messageMedia' controls preload='none'>
                                                <source src={props.media} />
                                                video is not supported
                                            </video>
                                        )
                                    case 'document':
                                        return (
                                            <div className="messageMedia docContainer">
                                                <img src={DocumentLogo} alt='document' />
                                                <a href={props.media} target='_blank'>Download</a>
                                            </div>
                                        );
                                    default: return <div>Unknown media type</div>;
                                }
                            })()
                        }
                        {
                            props.text && <div className="messageText">{props.text}</div>
                        }
                    </div>
                    <div className="details">
                        <div className="timing">{timeAgo.format(new Date(props.createdAt))}</div>
                        <div className="status">,{props.status}</div>
                    </div>
                </div>
            </ChatContainer>
        </>
    )
}

const ChatContainer = styled(motion.div)`
    margin:10px 0px;
    color:white;

    &>div{
            display:inline-block;
            max-width:60%;

            &.sent{
                float:right;

                &>.message{
                    border-bottom-right-radius: 0px;

                    &.withMedia{
                        width:400px;
                        
                    }
                }           
            }

            &.received{
                float:left;

                &>.message{
                    border-bottom-left-radius: 0px;
                    background-color: ${props => props.theme.info.dark};

                    &.withMedia{
                        width:400px;
                    }

                }
                &>.details{
                    justify-content: flex-start;
                }
            }

            &>.message{
                background-color: ${props => props.theme.primary.dark};
                padding:${props => props.theme.spacing};
                border-radius:${props => props.theme.spacing};
                line-height: 1.5em;
                word-spacing:1px;
                letter-spacing:.5px;

                &>.messageMedia{
                    width:100%;

                    &.docContainer{
                        display:flex;
                        align-items:center;
                        justify-content: center;

                        &>a{
                            font-size:1.3em;
                            color:white;
                            &:hover{
                                cursor:pointer;
                            }
                        }
                    }
                }
            }

            &>.details{
                display:flex;
                align-items:center;
                justify-content: flex-end;
                color:${props => props.theme.primary.dark};
                font-size:.8em;
                padding:0 ${props => props.theme.spacing};

                &>.timing{
                    margin-right:5px;
                }
            }
        }

    //clearfix for float
    &::after{
        content:'';
        display:block;
        clear:both;
    }

    @media only screen and ( max-width : 500px ){
        &>div{
            max-width:300px;

            &.sent>.message.withMedia,
            &.received>.message.withMedia{
                width:300px;
            }
        }
    }

`;

export default Chat;