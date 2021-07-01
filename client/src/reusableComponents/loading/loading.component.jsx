import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const Loading = React.forwardRef((props, ref) => {
    return (
        <LoadingContainer className="loading" ref={ref} {...props}>
            <div className="wheel"></div>
            Loading...
        </LoadingContainer>
    );
})

const rotate = keyframes`
    from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled(motion.div)`
    color:red;
    position:relative;
    padding:${props => props.theme.spacing};
    color:${props => props.theme.primary.dark};
    text-align:center;
    font-size:1.1em;
    display:flex;
    align-items: center;
    justify-content: center;

    &>.wheel{
        height:20px;
        width:20px;
        border:2px solid ${props => props.theme.primary.dark};
        border-radius:50%;
        box-shadow:0 0 15px #ccc;
        margin-right:3px;
        border-top-color: #ccc;
        animation-name:${rotate};
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;
        animation-direction: normal;
        animation-timing-function: linear;
    }

    
`;
export default Loading;