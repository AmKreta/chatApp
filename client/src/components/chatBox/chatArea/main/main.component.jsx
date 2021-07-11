import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';

//importing context
import ChattingWithContext from '../../chattingWith.context';

//importing custom components
import Chat from './chats/chats.component';

//importing services
import { get_chat } from '../../../../services/services';

const Main = ({ chat, setChat }) => {
    const userId = useSelector(state => state.user._id);
    const { chattingWith } = useContext(ChattingWithContext);

    useEffect(() => {
        if (userId && chattingWith?._id) {
            //async request creates bugs
            axios({
                method: 'get',
                url: get_chat,
                params: {
                    userId,
                    chattingWithId: chattingWith._id
                }
            })
                .then(res => setChat(res.data.payload))
                .catch(err => {
                    alert('unable to fetch chat');
                    console.log(err);
                })
        }
    }, [chattingWith?._id, userId, setChat])

    return (
        <AnimatePresence>
            <StyledMain>
                {
                    chattingWith && chat.map(item => <Chat key={item._id} {...item} />)
                }
            </StyledMain>
        </AnimatePresence>
    );
};

const StyledMain = styled(motion.main)`
    max-height:80%;
    overflow-y:scroll;;
    padding:5px ${props => props.theme.spacing};
`;

export default Main;