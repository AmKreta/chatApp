import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const PickedUp = ({ setCallStatus, userInfo, type, setCall, callFrom, callTo, userStreamRef, remoteStreamRef }) => {
    console.log(userStreamRef, remoteStreamRef);
    return (
        <PickedUpCopntainer>
            <video id='video' />
            <video id='remoteVideo' />
        </PickedUpCopntainer>
    );
}

const PickedUpCopntainer = styled(motion.div)`

`;

export default PickedUp;