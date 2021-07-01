import React from 'react';
import styled from 'styled-components';

//importing reusable copmponents
import Icon from '../icon/icon.component';
const Button = ({ title, frontIcon, backIcon, color = 'primary', disabled, iconSize = '20px', ...props }) => {
    return (
        <StyledButton {...props} color={color} disabled={disabled}>
            {
                frontIcon && <Icon size={iconSize} icon={frontIcon} style={{ marginRight: '5px' }} />
            }
            {title}
            {
                backIcon && <Icon size={iconSize} icon={frontIcon} style={{ marginLeft: '5px' }} />
            }
        </StyledButton>
    );
}

const StyledButton = styled.button`
    padding:5px 15px;
    margin:5px;
    font-size:1.1em;
    background-color:${props => props.disabled ? props.theme[props.color].light : props.theme[props.color].dark};
    color:white;
    border-radius:10px;
    border:none;
    outline:none;
    display:flex;
    align-items: center;
    justify-content: center;
    &:hover{
        cursor:pointer;
        background-color:${props => props.theme[props.color].regular};
    }
    &:disabled{
        cursor:no-drop;
        opacity:.6;
    }
`;

export default Button;


