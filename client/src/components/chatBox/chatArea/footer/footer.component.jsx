import React, { useState, useCallback, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

//importing custom components
import EmojiPicker from './emojiPicker/emojiPicker.component';
import GifPicker from './gifPicker/gifPicker.component';
import AudioMessage from './audioMessage/audioMessage.component';
import FilePicker from './filePicker/filePicker.component';
import VideoMessage from './videoMessage/videoMessage.component';
import Input from './input/input.component';

//importing formdata Context
import FormdataContext from './formDataContext/formdata.context';

//importing reusable Components
import Icon from '../../../../reusableComponents/icon/icon.component';

import { CHAT } from '../../../../services/socket.events';

//importing context
import ChattingWithContext from '../../chattingWith.context';
import SocketContext from '../../../../context/socket.context';

//importing actions
import { updateChatList, pushChat } from '../../../../actions/actions';

const Footer = () => {

    const [message, setMessage] = useState('');
    const [media, setMedia] = useState();//array for containing blob

    const userId = useSelector(state => state.user._id);
    const { chattingWith } = useContext(ChattingWithContext);
    const socket = useContext(SocketContext);

    const dispatch = useDispatch();

    const send = useCallback(async () => {
        if (chattingWith?._id && (message !== '' || media !== '')) {
            //senging message to server
            dispatch(pushChat({
                userId,
                chattingWithId: chattingWith._id,
                message,
                media,
                cb: () => {
                    dispatch(updateChatList(userId));
                    setMedia(undefined);
                    setMessage('');
                    socket.emit(CHAT, { sentBy: userId, receivedBy: chattingWith._id });
                }
            }))
        }
        else {
            media && setMedia(undefined);
            message !== '' && setMessage('');
            alert('pick someone to chat with');
        }
    }, [message, media, userId, chattingWith?._id, dispatch, socket]);

    //this is used to focus input field
    //whenever emoji is inserted
    const inputRef = useRef(null);

    return (
        <StyledFooter>
            <FormdataContext.Provider value={{ setMessage, setMedia, send }}>
                <EmojiPicker inputRef={inputRef} />
                <GifPicker media={media} />
                <div className='inputContainer'>
                    <Input value={message} inputRef={inputRef} />
                    <FilePicker media={media} />
                </div>
                <AudioMessage media={media} />
                <VideoMessage media={media} />
            </FormdataContext.Provider>
        </StyledFooter>
    );
}

const StyledFooter = styled.footer`
    background-color:${props => props.theme.primary.dark};
    box-shadow:0 0 3px ${props => props.theme.primary.dark};
    color:white;
    display:flex;
    align-items: center;
    justify-content:space-between;
    padding:0px ${props => props.theme.spacing};
    position:relative;

    &>*{
        margin:0px ${props => props.theme.spacing};
    }

    &>.icon{
        min-width:20px;
        flex-shrink:0;
    }

    &>.inputContainer{
        flex-grow: 1;
        flex-shrink:1;
        background-color:white;
        border:1px solid #ccc;
        border-radius:10px;
        height:30px;
        display:flex;
        align-items: center;
        color:${props => props.theme.primary.light};
        padding:0px ${props => props.theme.spacing};

        &>.icon{
            color:${props => props.theme.primary.dark};
            margin-left:${props => props.theme.spacing};
        }
    }

    @media only screen and ( max-width : 700px ){
        padding:0px 5px;

        &>*{
            margin-left:0;
            &:not(:last-child){
                margin-right:5px;
            }
        }

        &>.icon{
            min-width:25px !important;
        }
    }
`;
export default Footer;