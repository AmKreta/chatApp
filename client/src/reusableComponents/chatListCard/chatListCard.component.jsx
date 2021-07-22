import React, { useMemo, useEffect, useState, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styled from 'styled-components';

//importing services
import { get_userListById } from '../../services/services';

//importing utils
import AsyncRequest from '../../util/asyncRequest';

//imnporting reusable components
import Icon from '../icon/icon.component';
import Button from '../button/button.component';

//importing icons
import { IoIosChatboxes } from 'react-icons/io';
import { IoTime } from 'react-icons/io5';
import { GoVerified } from 'react-icons/go';

//importing context
import ChattingWithContext from '../../components/chatBox/chattingWith.context';
import TabsContext from '../../components/chatBox/aside/tabs.context';

//importing tabs name
import { CHAT } from '../../components/chatBox/aside/tabs';

import TimeAgo from 'javascript-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

const List = (props) => {

    const { _id: userId, /*userName*/ } = useSelector(state => state.user);

    const chattingWith = useMemo(() => {
        //returns id of other persont user chats with
        return props.lastChat?.sentBy === userId
            ? props.lastChat.receivedBy
            : props.lastChat.sentBy
    }, [props, userId]);

    //info of ot other user m this user is chatting with
    const [chatUser, setChatUser] = useState();

    const { setChattingWith } = useContext(ChattingWithContext);
    const { setActiveTab } = useContext(TabsContext);

    const messageHandler = useCallback(() => {
        setChattingWith(chatUser);
        setActiveTab(CHAT);
    }, [setChattingWith, chatUser, setActiveTab]);

    useEffect(() => {
        if (chattingWith) {
            AsyncRequest({
                method: 'get',
                url: get_userListById,
                params: {
                    ids: [chattingWith]
                }
            })
                .then(res => setChatUser(res[0]))
                .catch(err => {
                    console.log(err);
                    alert('unable to fetch user info for chatList');
                })
        }
    }, [chattingWith]);

    return (
        <StyledDiv>
            <img src={chatUser?.dp} alt={chatUser?.userName} loading='lazy' />
            <p className='lastMessage' title={props.lastChat.text}>
                {
                    (() => {
                        const lastChat = props.lastChat;
                        if (lastChat?.text) {
                            return lastChat.text;
                        }
                        else {
                            return lastChat.type;
                        }
                    })()
                }
            </p>
            <p className='userName'>{chatUser?.userName}</p>
            {
                chatUser?.isVefified && <Icon icon={GoVerified} size='15px' />
            }
            <div className="actions">
                <StyledButton
                    title={timeAgo.format(new Date(props.lastChat.createdAt))}
                    frontIcon={IoTime}
                    iconSize='15px'
                    toolTip={`last message ${timeAgo.format(new Date(props.lastChat.createdAt))}`}
                />
                <StyledButton
                    title='chat'
                    color='sucess'
                    frontIcon={IoIosChatboxes}
                    iconSize='15px'
                    onClick={messageHandler}
                    toolTip={`start a chat with ${props.userName}`}
                />
                {
                    //only show this if last message is sent by other user
                    props.unread > 0 && props.lastChat?.sentBy === chatUser?._id && (
                        <StyledButton
                            title={(() => {
                                if (props.unread < 10) {
                                    return props.unread
                                }
                                let roundedOff = Math.floor(props.unread / 10) * 10;
                                return roundedOff === props.unread ? props.unread : `${roundedOff}+`;
                            })()}
                            toolTip={`${props.unread} unread messages`}
                            color='warning'
                            style={{
                                justifySelf: 'flex-end'
                            }}
                        />
                    )
                }
            </div>
        </StyledDiv>
    );
}

const StyledDiv = styled(motion.div)`
    width:330px;
    overflow: hidden;
    min-height:95px;
    display:grid;
    grid-template-columns: 80px 3fr 1fr;
    grid-template-rows: repeat(3,1fr);
    grid-template-areas:"image userName isVerified" 
                        "image status status" 
                        "image actions actions";
    margin:4px;
    border:2px solid #ccc;
    border-bottom-width:3px;
    border-top-width:1px;
    border-radius:10px;
    box-shadow:0 0 5px #ccc;
    padding:3px 5px;

     &>img{
        grid-area: image;
        height:75px;
        width:75px;
        align-self: center;
        border-radius:5px;
        object-fit: cover;
        border-radius:50%;
        object-position:center center;
     }

     &>.lastMessage{
         grid-area:status;
         color:#beb8b8;
         white-space: nowrap;
         align-self: center;
         margin-left:5px;
         overflow:hidden;
         &:hover{
             cursor:pointer;
         }
     }

     &>.userName{
        grid-area:userName;
        text-transform: capitalize;
        font-size:1.3em;
        font-weight:400px;
        align-self: center;
        max-height:100%;
        position:relative;
        top:5px;
        margin-left:5px;
     }

     &>.icon{
        color:${props => props.theme.sucess.regular};
        grid-area:isVerified;
        justify-self: end;
     }

     &>.actions{
        position:relative;
        left:-2px;
        grid-area:actions;
        display:flex;
        align-items:center;
        justify-content: flex-start;
        margin-left:5px;
     }

     @media only screen and ( max-width : 700px ){
        width:285px;
        grid-template-columns: 60px 3fr 1fr;
        grid-column-gap: 5px;
        min-height:80px;
        margin:4px 2px;

        &>img{
            height:60px;
            width:60px;
        }

        &>.lastMessage{
            margin-top:3px;
            margin-bottom:3px;
        }

        &>.userName{
            font-size:1.1em;
        }

        &>.actions{
            margin-left:4px;
        }
    }
`;

const StyledButton = styled(Button)`
    font-size:.8em;
    border-radius:20px;
    padding:3px 9px;
    margin:0;
    &>.icon{
        margin-right:3px;
    }
    &:not(:last-child){
      margin-right:3px;  
    }

    @media only screen and ( max-width : 700px ){
    
        &>.icon{
            margin-right:2px;
        }
        &:not(:last-child){
        margin-right:4px;  
        }
    }
`;

export default List;