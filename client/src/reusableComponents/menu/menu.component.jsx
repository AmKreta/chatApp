import React from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import './menu.styles.css';


const Search = ({ displayMenu, showAtRight, children }) => {
    return (
        <AnimatePresence>
            {
                displayMenu && (
                    <SearchContainer className='displayMenu' showAtRight={showAtRight} variants={MenuVariant} initial='close' animate='open' exit='close' style={{ originX: 0, originY: 0 }}>
                        {typeof (children) === 'function' && children(ItemVariant)}
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