import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

//importing reusable components
import Icon from '../icon/icon.component';

//importing icon
import { FaChevronCircleDown } from 'react-icons/fa';

const Accordian = ({ icon, title = 'title', children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = useCallback(() => {
        setIsOpen(prevState => !prevState);
    }, [setIsOpen]);

    return (
        <AccordianContainer>
            <summary className="accordianHeader" onClick={toggle}>
                {icon && <Icon icon={icon} />}
                <p>{title}</p>
                <Icon icon={FaChevronCircleDown} size='20px' />
            </summary>
            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div className="accordianContent" variants={variant} initial='close' animate='open' exit='close'>
                            {children}
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </AccordianContainer>
    );
}

const AccordianContainer = styled.section`
    border:1px solid #ccc;
    box-shadow:0 0 5px #ccc, 0 0 5px #ccc inset;
    border-radius:${props => props.theme.spacing};
    width:min(400px,100%);
    margin:${props => props.theme.spacing} 0px;
    padding:${props => props.theme.spacing};

    &>.accordianHeader{
        color:${props => props.theme.primary.dark};
        font-weight:500;
        position:relative;

        &>*{
            display:inline-block;
            vertical-align: middle;

            &:first-child{
                margin-right:${props => props.theme.spacing};
            }

            &:last-child{
                position:absolute;
                right:0;
            }
        }
    }
    &>.accordianContent{
        overflow:hidden;
    }
`;

const variant = {
    close: {
        height: 0,
        transition:{
            duration:.5
        }
    },
    open: {
        height: 'auto',
        transition:{
            duration:.5
        }
    },
}


export default Accordian;