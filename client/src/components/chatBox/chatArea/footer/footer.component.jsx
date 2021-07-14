import React, { useState, useCallback, useRef, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

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

//importing utils
import AsyncRequest from '../../../../util/asyncRequest';

//importing services
import { post_chat/*post_upload*/ } from '../../../../services/services';
import { CHAT } from '../../../../services/socket.events';

//importing context
import ChattingWithContext from '../../chattingWith.context';
import SocketContext from '../../../../context/socket.context';

//importing actions
import { updateChatList } from '../../../../actions/actions';

const Footer = ({ setChat }) => {

    const [message, setMessage] = useState('');
    const [media, setMedia] = useState();//array for containing blob

    const userId = useSelector(state => state.user._id);
    const { chattingWith } = useContext(ChattingWithContext);
    const socket = useContext(SocketContext);

    const dispatch = useDispatch();

    const send = useCallback(async () => {
        if (chattingWith?._id) {
            AsyncRequest({
                method: 'post',
                url: post_chat,
                body: {
                    sentBy: userId,
                    receivedBy: chattingWith._id,
                    text: message,
                    media: media?.url,
                    type: media?.type
                }
            })
                .then(res => {
                    //dispathiching this action to dyncmically update chat list present in aside
                    dispatch(updateChatList(userId));
                    //to append messages in chat box
                    setChat(prevState => [...prevState, res])
                    //to clear whatever was in media so that user can send new media
                    setMedia(undefined);
                    //to clear input 
                    setMessage('');
                    socket.emit(CHAT, chattingWith._id);
                })
                .catch(err => {
                    console.log(err);
                    alert('unable to send message');
                })
        }
        else {
            alert('pick someone to chat with');
        }
    }, [message, media, userId, chattingWith?._id, setChat, dispatch]);

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
                    <Icon icon={FilePicker} />
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

    &>.inputContainer{
        flex-grow: 1;
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
`;
export default Footer;