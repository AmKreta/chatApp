import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PickedUp = ({ setCallStatus, userInfo, type, setCall, callFrom, callTo, userStream, remoteStream }) => {
    const userVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    useEffect(() => {
        if (userStream && remoteStream && userVideoRef.current && remoteVideoRef.current) {
            userVideoRef.current.srcObject = userStream;
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [userStream, remoteStream, userVideoRef, remoteVideoRef]);

    return (
        <PickedUpCopntainer>
            <video id='video' ref={userVideoRef} autoPlay muted style={{ maxWidth: '100%' }} />
            <video id='remoteVideo' ref={remoteVideoRef} autoPlay style={{ maxWidth: '100%' }} />
        </PickedUpCopntainer>
    );
}

const PickedUpCopntainer = styled(motion.div)`

`;

export default PickedUp;