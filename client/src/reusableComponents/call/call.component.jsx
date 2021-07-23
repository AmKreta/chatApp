import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import styled from 'styled-components';

//importing enum
import { RINGING, PICKEDUP } from './callStatus.enum';

//importing custom component
import PickedUp from './pickedUp/pickedUp.component';
import Ringing from './ringing/ringing.component';

//importing utils
import AsyncRequest from '../../util/asyncRequest';

//importing services
import { get_userListById } from '../../services/services';

//importing context 
import PeerContext from '../../context/peer.context';

//importing reusable components
import Button from '../button/button.component';

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

    const { peer } = useContext(PeerContext);

    const [userStream, setUserStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const [connection, setConnection] = useState();

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
        console.log('receiving call')
        peer.on('call', call => {
            setConnection(call);
            window
                .navigator
                .mediaDevices
                .getUserMedia({ audio: true, video: true })
                .then(stream => {
                    setUserStream(stream);
                    call.answer(stream);
                    call.on('stream', remoteStream => {
                        setRemoteStream(remoteStream);
                    });
                    call.on('close', () => {
                        setUserStream(null);
                        setRemoteStream(null);
                        setConnection(null);
                    })
                })
                .catch(err => {
                    console.log(err);
                    alert('unable to receive call, try again')
                })
        });
    }, [peer, type, setUserStream, setRemoteStream, setConnection]);

    const endCall = useCallback((e) => {
        setCall({ callfrom: null, callTo: null, type: null });
        userStream?.getTracks()?.forEach(function (track) {
            track.stop();
        });
        connection.close();                                
    }, [peer, setCall, userStream, connection]);

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
                                    setUserStream={setUserStream}
                                    setRemoteStream={setRemoteStream}
                                    setConnection={setConnection}
                                />
                            );
                        case PICKEDUP:
                            return (
                                <>
                                    <PickedUp
                                        setCallStatus={setCallStatus}
                                        userInfo={userInfo}
                                        type={type}
                                        setCall={setCall}
                                        callFrom={callFrom}
                                        callTo={callTo}
                                        userStream={userStream}
                                        remoteStream={remoteStream}
                                    />
                                    <Button title='end call' color='error' onClick={endCall} />
                                </>
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
    flex-flow:column nowrap;
    align-items:center;
    justify-content: center;
    z-index:4;

    &>div{
        height:450px;
        width:300px;
        background-color:black;
    }

    &>button{
        margin:calc(2*${props => props.theme.spacing});
    }
`;

export default Call;