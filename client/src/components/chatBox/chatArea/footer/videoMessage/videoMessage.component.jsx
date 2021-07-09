import React, { useState, useCallback, useRef, useContext } from 'react';
import Icon from '../../../../../reusableComponents/icon/icon.component';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';

//importing icons
import { FaCamera, FaRegStopCircle } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { MdRefresh, MdSend } from 'react-icons/md';

//importing reusable components
import Button from '../../../../../reusableComponents/button/button.component';

//importing context
import FormDataContext from '../formDataContext/formdata.context';

const VideoMessage = ({ media }) => {
    const [useCam, setUseCam] = useState(false);
    const [status, setStatus] = useState('notRecording');
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    const { setMedia, send } = useContext(FormDataContext);

    //setting constols function
    const startRecording = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.start(500);
            setStatus('recording');
            videoRef.current.muted=true;
        }
    }, [mediaRecorderRef, setStatus]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && videoRef.current) {
            mediaRecorderRef.current.state !== 'inactive' && mediaRecorderRef.current.stop();
            setStatus('notRecording');
            //setMedia([]);
            videoRef.current.srcObject = null;
            videoRef.current.muted=false;
            videoRef.current.src = URL.createObjectURL(new Blob(media, { type: media[0].type }));
        }
    }, [mediaRecorderRef, setStatus, media, videoRef]);

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
        if (videoRef.current && mediaRecorderRef.current && streamRef.current) {
            setMedia([]);
            setStatus('notRecording');
            videoRef.current.src = null;
            videoRef.current.muted=true;
            videoRef.current.srcObject = streamRef.current;
            mediaRecorderRef.current.state !== 'inactive' && mediaRecorderRef.current.stop();
        }
    }, [videoRef, setMedia, setStatus, mediaRecorderRef, streamRef]);

    const toggleUseCam = useCallback(() => {
        
        useCam && setMedia([]);

        setUseCam(prevState => {
            if (prevState) {
                //ie feed is live
                //turn off feed
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(function (track) {
                        track.stop();
                        streamRef.current = null;
                    });
                }

                if (mediaRecorderRef.current) {
                    mediaRecorderRef.current.state !== 'inactive' && mediaRecorderRef.current.stop();
                }

                return false;
            }
            else {
                //feed is not live
                //turn on feed
                navigator
                    .mediaDevices
                    .getUserMedia({ audio: true, video: true })
                    .then(stream => {
                        streamRef.current = stream;
                        videoRef.current.srcObject = stream;
                        videoRef.current.muted=true;
                        mediaRecorderRef.current = new MediaRecorder(stream);
                        mediaRecorderRef.current.ondataavailable = (e) => setMedia(prevState => [...prevState, e.data]);
                    })
                    .catch(err => {
                        console.log(err);
                        alert("can't access your camera");
                    })
                return true;
            }
        });
    }, [setUseCam, streamRef, mediaRecorderRef, videoRef, setMedia]);

    return (
        <>
            <AnimatePresence>
                {
                    useCam && (
                        <Overlay variants={variant} initial='close' animate='open' exit='close'>
                            <Icon icon={AiOutlineClose} onClick={toggleUseCam} />
                            <video autoPlay controls ref={videoRef} />
                            <div className="action">
                                <Button
                                    title={status === 'notRecording' ? 'start recording' : status === 'recording' ? 'pause' : 'resume'}
                                    onClick={status === 'notRecording' ? startRecording : status === 'recording' ? pauseRecording : resumeRecording}
                                    frontIcon={FaCamera}
                                    disabled={media.length > 0 && mediaRecorderRef.current.state === 'inactive'}
                                />
                                <Button
                                    title='stop'
                                    frontIcon={FaRegStopCircle}
                                    onClick={stopRecording}
                                    disabled={media.length === 0 || mediaRecorderRef.current?.state === 'inactive'}
                                />
                                <Button
                                    title='reset'
                                    frontIcon={MdRefresh}
                                    onClick={resetRecording}
                                    disabled={media.length === 0 || mediaRecorderRef.current?.state !== 'inactive'}
                                />
                                <Button
                                    title='send'
                                    disabled={media.length === 0 || videoRef.current?.src === 'null' || mediaRecorderRef.current.state !== 'inactive'}
                                    frontIcon={MdSend}
                                    onClick={send}
                                />
                            </div>
                        </Overlay>
                    )
                }
            </AnimatePresence>
            <Icon icon={FaCamera} onClick={toggleUseCam} />
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
    display:flex;
    align-items: center;
    flex-flow: column nowrap;
    justify-content: space-evenly;

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
    }
    &>.action{
        display:flex;
        align-items:center;
        justify-content: center;
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

export default VideoMessage;