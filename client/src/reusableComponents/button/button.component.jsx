import React from 'react';
import styled from 'styled-components';

//importing reusable copmponents
import Icon from '../icon/icon.component';
const Button = ({ toolTip, title, frontIcon, backIcon, color = 'primary', disabled, iconSize = '20px', loading, ...props }) => {
    return (
        <StyledButton {...props} color={color} disabled={disabled || loading} title={toolTip}>
            {
                frontIcon && <Icon size={iconSize} icon={frontIcon}/>
            }
            {title}
            {
                backIcon && <Icon size={iconSize} icon={frontIcon} />
            }
            {
                loading
                    ?<LoaderOverlay />
                    :null
            }
        </StyledButton>
    );
}

const StyledButton = styled.button`
    position:relative;
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
    &>.icon{
        margin-right: '5px'
    }
`;

const LoaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  pointer-events: none;

  &::after{
    content:'';
    height:10px;
    width:10px;
    border-radius:50%;
    border:2px solid blue;
    border-top-color: white;
    animation-name:rotate;
    animation-iteration-count:infinite;
    animation-duration:1s;
    animation-play-state:running;
    animation-timing-function:linear;

    @keyframes rotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
    }
  }
`;

export default Button;


