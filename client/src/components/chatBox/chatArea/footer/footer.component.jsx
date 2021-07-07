import React, { useState, useCallback, useRef } from 'react';
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

const Footer = () => {
    const [message, setMessage] = useState('');
    const [media, setMedia] = useState([]);//array for containing blob

    const send = useCallback(() => {
        console.log({ message, media });
        setMessage('');
        setMedia([]);
    }, [message, media]);

    //this is used to focus input field
    //whenever emoji is inserted
    const inputRef = useRef(null);

    return (
        <StyledFooter>
            <FormdataContext.Provider value={{ setMessage, setMedia, send }}>
                <EmojiPicker inputRef={inputRef} />
                <GifPicker />
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