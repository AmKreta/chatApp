import React from 'react';
import styled from 'styled-components';

const Header = () => {
    return (
        <StyledHeader>
            header
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    background-color: ${props => props.theme.primary.light};
    box-shadow:0 0 3px ${props => props.theme.primary.dark};
    color:white;
`;

export default Header;