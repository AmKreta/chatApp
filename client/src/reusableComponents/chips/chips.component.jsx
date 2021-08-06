import React from 'react';
import styled from 'styled-components';

//importing reusable components
import Icon from '../icon/icon.component';

const Chips = ({ icon, title = 'title', onClick, active }) => {
    return (
        <Container onClick={onClick} active={active} title={title}>
            {
                icon && <Icon icon={icon} />
            }
            <p>{title}</p>
        </Container>
    );
}

const Container = styled.div`
    display:inline-block;
    vertical-align: middle;
    margin:0 calc(${props => props.theme.spacing} / 2);
    padding:calc(${props => props.theme.spacing} / 2) ${props => props.theme.spacing};
    border:1px solid ${props => props.theme.primary.dark};
    border-radius:calc(${props => props.theme.spacing} * 2);
    font-size:.9em;
    font-weight:500;
    color:${props => props.active ? 'white' : props.theme.primary.dark};
    background-color: ${props => props.active ? props.theme.primary.dark : 'white'};

    &:hover{
        cursor:pointer;
        opacity:.5;
    }
`;

export default Chips;