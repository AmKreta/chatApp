import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Peer from 'peerjs';

//importing enum
import { RINGING, PICKEDUP } from './callStatus.enum';

//importing custom component
import PickedUp from './pickedUp/pickedUp.component';
import Ringing from './ringing/ringing.component';

//importing utils
import AsyncRequest from '../../util/asyncRequest';

//importing services
import { get_userListById } from '../../services/services';


/* 
    - make this component work as webrtc signalling server\
    - type= 'call' / 'videoCall'
*/
const Call = ({ callFrom, callTo, type, setCall }) => {

    //setCall toggels call popup, type is call type ie call,videoCall
    /*
        call status:-
        1) none -neither ringing nor picked up
        2) ringing
        3) pickedup

        //ringing by default , when this will popup , ringing component would be mounted
    */

    const [callStatus, setCallStatus] = useState(RINGING);
    //remote user
    const [userInfo, setUserInfo] = useState({});
    //current user
    const userId = useSelector(state => state.user._id);
    const peer = useMemo(() => new Peer(userId), [userId]);
    const userStreamRef = useRef(null);
    const remoteStreamRef = useRef(null);



    //effect for fetching info of user on the other side of call
    useEffect(() => {
        if (callFrom && callTo && userId) {
            let callId = callTo === userId ? callFrom : callTo
            AsyncRequest({
                method: 'get',
                url: get_userListById,
                params: {
                    ids: [callId]
                }
            })
                .then(res => setUserInfo(res[0]))
                .catch(err => {
                    console.log(err);
                    alert('unable to fetch user info for chatList');
                })
        }
    }, [callFrom, callTo, userId]);

    useEffect(() => {
        peer.on('open', function (id) {
            console.log('My peer ID is: ' + id);
        });
        peer.on('call', call => {
            window
                .navigator
                .mediaDevices
                .getUserMedia({ audio: true, video: type === 'call' ? false : true })
                .then(stream => {
                    userStreamRef = stream;
                    call.answer(stream);
                    call.on('stream', remoteStream => {
                        remoteStreamRef.current = remoteStream;
                    });
                })
                .catch(err => {
                    console.log(err);
                    alert('unable to receive call, try again')
                })
        });
    }, [peer, type, userStreamRef, remoteStreamRef]);

    return (
        <CallContainer>
            {
                (() => {
                    switch (callStatus) {
                        case RINGING:
                            return (
                                <Ringing
                                    setCallStatus={setCallStatus}
                                    userInfo={userInfo}
                                    type={type}
                                    setCall={setCall}
                                    callFrom={callFrom}
                                    callTo={callTo}
                                    peer={peer}
                                    userStreamRef={userStreamRef}
                                    remoteStreamRef={remoteStreamRef}
                                />
                            );
                        case PICKEDUP:
                            return (
                                <PickedUp
                                    setCallStatus={setCallStatus}
                                    userInfo={userInfo}
                                    type={type}
                                    setCall={setCall}
                                    callFrom={callFrom}
                                    callTo={callTo}
                                    userStreamRef={userStreamRef}
                                    remoteStreamRef={remoteStreamRef}
                                />
                            );
                        default: return null;
                    }
                })()
            }
        </CallContainer>
    );
}

const CallContainer = styled(motion.div)`
    height: 100%;
    width:100%;
    background-color:rgba(0,0,0,.6);
    position:absolute;
    backdrop-filter: blur(10px);
    top:0;
    left:0;
    display:flex;
    align-items:center;
    justify-content: center;
    z-index:4;

    &>div{
        height:450px;
        width:300px;
        background-color:black;
    }
`;

export default Call;