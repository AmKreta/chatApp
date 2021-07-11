import React, { useState, useRef, useCallback, useContext, useEffect } from 'react';
import Icon from '../../../../../reusableComponents/icon/icon.component';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import axios from 'axios';

//importing icons
import { AiOutlineClose } from 'react-icons/ai';
import { FaMicrophone, FaRegStopCircle } from 'react-icons/fa';
import { MdRefresh, MdSend } from 'react-icons/md';

//importing reusable components
import Button from '../../../../../reusableComponents/button/button.component';

//importing context
import FormDataContext from '../formDataContext/formdata.context';

//importing services
import { post_upload } from '../../../../../services/services';

const AudioMessage = ({ media }) => {
    const [audio, setAudio] = useState([]);
    const [useMic, setUseMic] = useState(false);
    const [status, setStatus] = useState('notRecording');
    const audioRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const streamRef = useRef(null);

    const { setMedia, send } = useContext(FormDataContext);

    //setting constols function
    const startRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.start(500);
            setStatus('recording');
        }
    }, [mediaRecorderRef, setStatus]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && audioRef.current) {
            mediaRecorderRef.current.state !== 'inactive' && mediaRecorderRef.current.stop();
            setStatus('notRecording');
            audioRef.current.src = URL.createObjectURL(new Blob(audio, { type: audio[0].type }));
        }
    }, [mediaRecorderRef, setStatus, audio, audioRef]);

    const pauseRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.pause();
            setStatus('paused');
        }
    }, [mediaRecorderRef, setStatus]);

    const resumeRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            setStatus('recording');
            mediaRecorderRef.current.resume();
        }
    }, [mediaRecorderRef, setStatus]);

    const resetRecording = useCallback(() => {
        if (audioRef.current && mediaRecorderRef.current) {
            setAudio([]);
            setStatus('notRecording');
            audioRef.current.src = null;
            mediaRecorderRef.current.state !== 'inactive' && mediaRecorderRef.current.stop();
        }
    }, [audioRef, setAudio, setStatus, mediaRecorderRef]);

    //starting navigator api
    const toggleUseMic = useCallback(() => {
        setUseMic(prevState => {
            if (prevState) {
                if (mediaRecorderRef.current) {
                    mediaRecorderRef.current.state !== 'inactive' && mediaRecorderRef.current.stop();
                }
                //perform action before closing
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(function (track) {
                        track.stop();
                    });
                    streamRef.current = null;
                }
                //setting media to initial state, ie empty array of blob
                setAudio([]);
            }
            else {
                //perform action before starting
                navigator
                    .mediaDevices
                    .getUserMedia({ audio: true })
                    .then(stream => {
                        streamRef.current = stream;
                        mediaRecorderRef.current = new MediaRecorder(stream);
                        mediaRecorderRef.current.ondataavailable = e => {
                            setAudio(prevState => [...prevState, e.data]);
                        };
                    })
                    .catch(err => {
                        console.log(err);
                        alert("can't access your microphone");
                    })
            }
            return !prevState;
        });
    }, [setUseMic, streamRef, setAudio, mediaRecorderRef]);


    const sendAudio = useCallback(() => {
        //create a new blob of type mp3
        //converting it into a file object
        let audioBlob = new Blob(audio, { type: 'audio/mpeg-3' });
        let audioFile = new File([audioBlob], 'voiceMessage.mp3');

        //uploading audio and receiving url
        let formData = new FormData();
        formData.append('file', audioFile);

        axios({
            method: 'post',
            url: post_upload,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                let uploadedUrl = res.data.url;
                setMedia({ url: uploadedUrl, type: 'audio' });
                setAudio([]);
            })
            .catch(err => {
                console.log(err);
                alert("unable to upload audio");
            })
    }, [setAudio, setMedia, audio]);

    useEffect(() => {
        if (media && media.type === 'audio' && useMic) {
            //to prevent sending if media is set by other component
            send();
        }
    }, [media, send, useMic]);

    return (
        <>
            <AnimatePresence>
                {
                    useMic && (
                        <Overlay variants={variant} initial='close' animate='open' exit='close'>
                            <Icon icon={AiOutlineClose} onClick={toggleUseMic} />
                            <div className="audioPreview">
                                <audio controls ref={audioRef} />
                            </div>
                            <div className="action">
                                <Button
                                    title={status === 'notRecording' ? 'start recording' : status === 'recording' ? 'pause' : 'resume'}
                                    onClick={status === 'notRecording' ? startRecording : status === 'recording' ? pauseRecording : resumeRecording}
                                    frontIcon={FaMicrophone}
                                    disabled={audio.length > 0 && mediaRecorderRef.current.state === 'inactive'}
                                />
                                <Button
                                    title='stop'
                                    frontIcon={FaRegStopCircle}
                                    onClick={stopRecording}
                                    disabled={audio.length === 0 || mediaRecorderRef.current?.state === 'inactive'}
                                />
                                <Button
                                    title='reset'
                                    frontIcon={MdRefresh}
                                    onClick={resetRecording}
                                    disabled={audio.length === 0 || mediaRecorderRef.current?.state !== 'inactive'}
                                />
                                <Button
                                    title='send'
                                    disabled={audio.length === 0 || audioRef.current?.src === 'null' || mediaRecorderRef.current.state !== 'inactive'}
                                    frontIcon={MdSend}
                                    onClick={sendAudio}
                                />
                            </div>
                        </Overlay>
                    )
                }
            </AnimatePresence>
            <Icon icon={FaMicrophone} onClick={toggleUseMic} />
        </>
    );
}

const Overlay = styled(motion.div)`
    background:rgba(0,0,0,.8);
    color:white;
    position:fixed;
    top:0;
    left:0;
    height:100%;
    width:100%;
    margin:0px !important;
    text-align:center;
    display:flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;

    &>.action{
        display: flex;
        align-items: center;
        justify-content: center;
        width:100%;
        margin-top:20px;
    }

    &>.icon:first-child{
        position:absolute;
        top:0;
        right:0;
        margin:10px;
    }

    &>.icon:last-child{
        position:absolute;
        bottom:5%;
        left:50%;
        transform:translateX(-50%);
    }

    &>video{
        height:75%;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }
`;

const variant = {
    open: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: .1
        }
    },
    close: {
        opacity: 0,
        scale: 0,
        transition: {
            delayChildren: .1
        }
    }
}

export default AudioMessage;