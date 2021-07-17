import React from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Search = ({ displayMenu, showAtRight }) => {
    return (
        <AnimatePresence>
            {
                displayMenu && (
                    <SearchContainer showAtRight={showAtRight} variants={MenuVariant} initial='close' animate='open' exit='close' style={{ originX: 0, originY: 0 }}>
                        <motion.div variants={ItemVariant}>New Group</motion.div>
                        <motion.div variants={ItemVariant}>Setting</motion.div>
                        <motion.div variants={ItemVariant}>Logout</motion.div>
                    </SearchContainer>
                )
            }
        </AnimatePresence>
    );
}

const SearchContainer = styled(motion.div)`
    position:absolute;
    background:white;
    border:1px solid #ccc;
    border-radius: 5px;
    box-shadow:0 0 3px #ccc;
    color:black;
    width:150px;
    z-index:1;
    top:25px;
    ${(props) => {
        return props.showAtRight
            ? css`right:15px;`
            : css`left:15px`;
    }}
    padding:5px;
`;

const MenuVariant = {
    open: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: .2,
            staggerChildren: .1
        }
    },
    close: {
        opacity: 0,
        scale: 0,
        overflow: 'hidden',
        transition: {
            duration: .5,
            delay: .1,
            staggerChildren: .05,
        }
    }
}

const ItemVariant = {
    open: {
        y: 0,
        opacity: 1
    },
    close: {
        y: '-10px',
        opacity: 0
    }
}

export default Search;