import React, { useContext, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

//importing reusable components
import Icon from '../icon/icon.component';

//importing icons
import { GoVerified } from 'react-icons/go';
import { IoIosChatboxes } from 'react-icons/io';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { HiUserRemove } from 'react-icons/hi';

//importing buttons
import Button from '../button/button.component';

//importing context
import ChattingWithContext from '../../components/chatBox/chattingWith.context';
import TabsContext from '../../components/chatBox/aside/tabs.context';

//importing tabs name
import { CHAT } from '../../components/chatBox/aside/tabs';

//importing utils
import AsyncRequest from '../../util/asyncRequest';

//importing services
import { put_removeContact, put_addToFavorite, delete_removeFavorite } from '../../services/services';

//importing actions
import { updateCurrentUser } from '../../actions/actions';

const ProfileCard = (props) => {

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const { setChattingWith } = useContext(ChattingWithContext);
    const { setActiveTab } = useContext(TabsContext);

    //function for toggling favorite
    const addToFavorite = useCallback(() => {
        AsyncRequest({
            method: 'put',
            url: put_addToFavorite,
            body: {
                userId: user._id,
                favId: props._id
            }
        })
            .then(res => dispatch(updateCurrentUser(res)))
            .catch(err => {
                console.log(err);
                alert("can't remove contact, try again !");
            });
    }, [user, props._id, dispatch]);

    const removeFavorite = useCallback(() => {
        AsyncRequest({
            method: 'delete',
            url: delete_removeFavorite,
            body: {
                userId: user._id,
                favId: props._id
            }
        })
            .then(res => dispatch(updateCurrentUser(res)))
            .catch(err => {
                console.log(err);
                alert("can't remove contact, try again !");
            });
    }, [user, props._id, dispatch]);

    //function for removing contact
    const removeContact = useCallback(() => {
        AsyncRequest({
            method: 'put',
            url: put_removeContact,
            body: {
                userId: user._id,
                contactId: props._id
            }
        })
            .then(res => dispatch(updateCurrentUser(res)))
            .catch(err => {
                console.log(err);
                alert("can't remove contact, try again !");
            });
    }, [user, props._id, dispatch]);

    const messageHandler = useCallback(() => {
        setChattingWith(props);
        setActiveTab(CHAT);
    }, [setChattingWith, props, setActiveTab]);

    return (
        <CardContainer variants={variants} key={props._id}>
            <img src={props.dp} alt={props.userName} loading='lazy' />
            <p className='status' title={props.status}>{props.status}</p>
            <p className='userName'>{props.userName}</p>
            {
                props.isVefified && <Icon icon={GoVerified} size='15px' />
            }
            <div className="actions">
                {
                    user.fav?.includes(props._id)
                        ? (
                            <StyledButton
                                title='dislike'
                                color='primary'
                                frontIcon={AiFillDislike}
                                iconSize='15px'
                                onClick={removeFavorite}
                                toolTip={`add ${props.userName} favorite`}
                            />
                        )
                        : (
                            <StyledButton
                                title='like'
                                color='primary'
                                frontIcon={AiFillLike}
                                iconSize='15px'
                                onClick={addToFavorite}
                                toolTip={`add ${props.userName} favorite`}
                            />
                        )
                }
                <StyledButton
                    title='remove'
                    color='secondary'
                    frontIcon={HiUserRemove}
                    iconSize='15px'
                    onClick={removeContact}
                    toolTip={`remove ${props.userName} from contacts`}
                />
                <StyledButton
                    title='chat'
                    color='sucess'
                    frontIcon={IoIosChatboxes}
                    iconSize='15px'
                    onClick={messageHandler}
                    toolTip={`start a chat with ${props.userName}`}
                />
            </div>
        </CardContainer>
    );
}

const CardContainer = styled(motion.div)`
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
     &>.status{
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

        &>.status{
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

    @media only screen and ( max-width : 700px ){
    
        &>.icon{
            margin-right:2px;
        }
        &:not(:last-child){
        margin-right:4px;  
        }
    }
`;


const variants = {
    open: {
        y: '0px',
        rotateX: '0deg',
        opacity: 1,
        transition: {
            duration: .5
        }
    },
    close: {
        y: '25px',
        rotateX: '60deg',
        opacity: 0
    }
}
export default ProfileCard;