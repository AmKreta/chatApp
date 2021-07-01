import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

//importing reusable components
import Icon from '../icon/icon.component';

//importing icons
import { GoVerified } from 'react-icons/go';
import { IoIosChatboxes } from 'react-icons/io';
import { HiUserAdd } from 'react-icons/hi';

//importing buttons
import Button from '../button/button.component';

const ProfileCard = ({ dp, status, userName, isVefified }) => {
    return (
        <CardContainer>
            <img src={dp} alt={userName} loading='lazy'/>
            <p className='status' title={status}>{status}</p>
            <p className='userName'>{userName}</p>
            {
                isVefified && <Icon icon={GoVerified} size='15px' />
            }
            <div className="actions">
                <StyledButton title='Add' frontIcon={HiUserAdd} iconSize='17px'/>
                <StyledButton title='Message' color='sucess' frontIcon={IoIosChatboxes} iconSize='17px'/>
            </div>
        </CardContainer>
    );
}

const CardContainer = styled(motion.div)`
    width:320px;
    overflow: hidden;
    height:100px;
    min-height:100px;
    display:grid;
    grid-template-columns: 90px 3fr 1fr;
    grid-template-rows: repeat(3,1fr);
    grid-template-areas:"image userName isVerified" 
                        "image status status" 
                        "image actions actions";
    margin:5px;
    border:2px solid #ccc;
    border-bottom-width:3px;
    border-top-width:1px;
    border-radius:10px;
    box-shadow:0 0 5px #ccc;
    padding:5px;
    align-items: center;

     &>img{
        grid-area: image;
        height:80px;
        width:80px;
        align-self: center;
        border-radius:5px;
        object-fit: cover;
        border-radius:50%;
        object-position:center center;
     }
     &>.status{
         grid-area:status;
         color:#beb8b8;
         white-space: nowrap;
     }
     &>.userName{
        grid-area:userName;
        text-transform: capitalize;
        font-size:1.3em;
        font-weight:400px;
     }

     &>.icon{
        color:${props => props.theme.sucess.regular};
        grid-area:isVerified;
        justify-self: end;
     }

     &>.actions{
         grid-area:actions;
         display:flex;
         align-items:center;
         justify-content: flex-start;
     }
`;

const StyledButton = styled(Button)`
    font-size:.9em;
    border-radius:20px;
    padding:3px 10px;
    margin:0;
    &:nth-child(1){
      margin-right:10px;  
    }
`;

export default ProfileCard;