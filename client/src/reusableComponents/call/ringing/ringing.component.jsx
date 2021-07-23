import { motion } from 'framer-motion';
import React, { useEffect, useCallback, useMemo, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

//importing reusable components
import Button from '../../button/button.component';

//importing services
import { END_CALL, DECLINE_CALL, ACCEPT_CALL } from '../../../services/socket.events';

//importing context
import socketContext from '../../../context/socket.context';
import PeerContext from '../../../context/peer.context';

//importing enum
import { PICKEDUP } from '../callStatus.enum';

const Ringing = ({ setCallStatus, userInfo, type, setCall, callFrom, callTo, setUserStream, setRemoteStream, setConnection }) => {

    const ringtone = useMemo(() => new Audio('https://2u039f-a.akamaihd.net/downloads/ringtones/files/mp3/memories-instrumental-ringtone-english-song-ringtone-54364.mp3'), []);

    const socket = useContext(socketContext);
    const { peer, peerId } = useContext(PeerContext);

    const userId = useSelector(state => state.user._id);

    const acceptCall = useCallback(() => {
        socket?.emit(ACCEPT_CALL, { callFrom, callTo, peerId });
        ringtone?.pause();
        ringtone.currentTime = 0;
        setCallStatus(PICKEDUP);
    }, [socket, ringtone, setCallStatus, callFrom, callTo, peerId]);

    const declineCall = useCallback(() => {
        socket?.emit(DECLINE_CALL, { callFrom, callTo });
        ringtone?.pause();
        ringtone.currentTime = 0;
        setCall && setCall({ callFrom: null, callTo: null, type: null });
    }, [socket, ringtone, setCall, callFrom, callTo]);

    const endCall = useCallback(() => {
        socket?.emit(DECLINE_CALL, { callFrom, callTo });
        ringtone?.pause();
        ringtone.currentTime = 0;
        setCall && setCall({ callFrom: null, callTo: null, type: null });
    }, [socket, ringtone, setCall, callFrom, callTo]);

    const onCallDecline = useCallback(() => {
        setCall({ callFrom: null, callTo: null, type: null });
        ringtone?.pause();
        ringtone.currentTime = 0;
    }, [setCall, ringtone]);

    const onCallEnd = useCallback(() => {
        setCall({ callFrom: null, callTo: null, type: null });
        ringtone?.pause();
        ringtone.currentTime = 0;
    }, [setCall, ringtone]);

    const onCallAccept = useCallback(({ remotePeerId }) => {
        ringtone?.pause();
        ringtone.currentTime = 0;
        navigator
            .mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then(stream => {
                const call = peer.call(remotePeerId, stream);
                if (call) {
                    call.on('stream', remoteStream => {
                        setRemoteStream(remoteStream);
                        setUserStream(stream);
                        setConnection(call);
                    });
                    call.on('close', () => {
                        setUserStream(null);
                        setRemoteStream(null);
                        setConnection(null);
                    })
                }
                else {
                    alert("couldn't connect to peer");
                }
            })
            .catch(err => {
                console.log(err);
                alert('unable to get local video');
            })
        setCallStatus(PICKEDUP);
    }, [ringtone, setCallStatus, peer, setUserStream, setRemoteStream, type]);

    useEffect(() => {
        ringtone?.play();

        socket?.on(DECLINE_CALL, onCallDecline);
        socket?.on(END_CALL, onCallEnd);
        socket?.on(ACCEPT_CALL, onCallAccept);

        return () => {
            socket?.off(DECLINE_CALL, onCallDecline);
            socket?.off(END_CALL, onCallEnd);
            socket?.off(ACCEPT_CALL, onCallAccept);
        }

    }, [ringtone, socket, onCallAccept, onCallEnd, onCallDecline]);

    return (
        <RingingCopntainer>
            <div className="userInfo">
                <p className="user">{userInfo.userName}</p>
                <div className="callIcon"><p>.</p><p>.</p><p>.</p></div>
            </div>
            <div className="avatar">
                <img src={userInfo.dp} alt='user profile' />
            </div>
            <div className="actions">
                {
                    //callTo===userId , ie user is receiving phone
                    userId === callTo && <Button title='Accept' color='sucess' onClick={acceptCall} />
                }
                <Button
                    title={userId === callTo ? 'Decline' : 'End Call'}
                    color='error'
                    onClick={userId === callTo ? declineCall : endCall}
                />
            </div>
        </RingingCopntainer>
    );
}

const callAnimation = keyframes`
    from{
        left:0;
    }
    to{
        left:98%;
    }
`;

const RingingCopntainer = styled(motion.div)`
    display:flex;
    flex-flow:column nowrap;
    align-items: center;
    border-radius:10px;
    padding:${props => props.theme.spacing};
    justify-content: space-around;

    .userInfo{
        height:10%;
        color:white;    
        text-transform: capitalize;
        font-size:1.5em;
        display:flex;
        align-items: baseline;
        width:100%;

        &>.callIcon{
            flex-grow:1;
            padding-left:5px;
            display:flex;
            &>p{
                animation: ${callAnimation} 1s ease-in-out infinite;
                animation-duration: 1.5s;
                position:relative;
                &:nth-child(1){
                    animation-delay: .2s;
                }
                &:nth-child(2){
                    animation-delay: .4s;
                }
                &:nth-child(3){
                    animation-delay: .6s;
                }
            }
        }
    }

    .avatar{
        height:250px;
        width:250px;
        border-radius: 50%;
        overflow:hidden;
        &>img{
            min-height:100%;
            max-width: 100%;
            max-height:100%;
            object-fit: cover;
        }
    }

    &>.actions{
        width:100%;
        &>button{
            width:100%;
            margin:10px 0;
        }
    }
`;

export default Ringing;