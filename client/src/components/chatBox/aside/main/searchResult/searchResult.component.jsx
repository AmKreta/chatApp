import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';


//importing reusable components
import ProfileCard from '../../../../../reusableComponents/profileCard/profileCard.component';

const ChatList = ({ list, setList }) => {

    useEffect(() => {
        //need to clear previous liost items
        setList([]);
    }, [setList]);

    return (
        <Container className="chatList" variants={variants} initial='close' animate='open'>
            {
                list.length === 0 ? <motion.p>Type in search box to search</motion.p> : null
            }
            {
                list.map(item => (
                    <ProfileCard
                        {...item}
                        key={item._id}
                        id={item._id}
                    />
                ))
            }
        </Container>
    );
}

const variants = {
    open: {
        opacity: 1,
        transition: {
            staggerChildren: .2
        }
    },
    close: {
        opacity: 0
    }
}

const Container = styled(motion.div)`
    overflow-y:scroll;
    &>p{
        color:#beb8b8;
        font-size:1.3em;
        height:100%;
        width:100%;
        display:flex;
        align-items:center;
        justify-content: center;
    }
`;
export default ChatList;