import React from 'react';
import Styled from 'styled-components';

const Header = () => {
    return (
        <StyledHeader>
            <h1>Setting</h1>
        </StyledHeader>
    );
}

const StyledHeader = Styled.header`
    background-color:${props => props.theme.primary.dark};
    height:10%;
    color:white;
    display:flex;
    align-items:center;
    &>h1{
        font-weight:450;
        padding:0 16px;
    }
`;

export default Header;