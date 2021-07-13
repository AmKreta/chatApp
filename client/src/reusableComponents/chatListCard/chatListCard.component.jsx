import React, { useMemo, useEffect, useState } from 'react';
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
import { GoVerified } from 'react-icons/go';

const List = (props) => {

    const userId = useSelector(state => state.user._id);

    const chattingWith = useMemo(() => {
        //returns id of other persont user chats with
        return props.lastChat?.sentBy === userId
            ? props.lastChat.receivedBy
            : props.lastChat.sentBy
    }, [props, userId]);

    //info of ot other user m this user is chatting with
    const [chatUser, setChatUser] = useState();

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
    }, [chattingWith])

    return (
        <StyledDiv>
            <img src={chatUser?.dp} alt={chatUser?.userName} loading='lazy' />
            <p className='lastMessage'>
                last message
                {

                }
            </p>
            <p className='userName'>{chatUser?.userName}</p>
            {
                chatUser?.isVefified && <Icon icon={GoVerified} size='15px' />
            }
            <div className="actions">
                <StyledButton
                    title='like'
                />
                <StyledButton
                    title='chat'
                />
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
`;

const StyledButton = styled(Button)`
    font-size:.82em;
    border-radius:20px;
    padding:3px 9px;
    margin:0;
    &>.icon{
        margin-right:3px;
    }
    &:not(:last-child){
      margin-right:4px;  
    }
`;

export default List;