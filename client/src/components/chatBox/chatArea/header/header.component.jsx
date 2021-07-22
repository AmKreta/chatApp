import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

//importing context
import ChattingWithContext from '../../chattingWith.context';
import SocketContext from '../../../../context/socket.context';

//importing reusable components
import Icon from '../../../../reusableComponents/icon/icon.component';
import Menu from './menu/menu.component';

//importing icons
import { GoVerified } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosVideocam, IoIosCall } from 'react-icons/io';

//importing services
import { IS_ONLINE, CALL } from '../../../../services/socket.events';

const Header = ({ setCall }) => {
    const { chattingWith } = useContext(ChattingWithContext);
    const socket = useContext(SocketContext);
    const userId = useSelector(state => state.user._id);

    const [isOnline, setIsOnline] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(false);

    const toggleMenu = useCallback(() => {
        setDisplayMenu(prevState => !prevState);
    }, [setDisplayMenu]);

    const call = useCallback((e) => {
        if (socket && chattingWith?._id && userId) {
            socket.emit(CALL, { callFrom: userId, callTo: chattingWith._id, type: 'call' });
            setCall({  callFrom: userId, callTo: chattingWith._id, type: 'call' });
        }
    }, [socket, chattingWith?._id, userId, setCall]);

    const videoCall = useCallback((e) => {
        if (socket && chattingWith?._id && userId) {
            socket.emit(CALL, { callFrom: userId, callTo: chattingWith._id, type: 'videoCall' });
            setCall({  callFrom: userId, callTo: chattingWith._id, type: 'call' });
        }
    }, [socket, chattingWith?._id, userId, setCall]);

    useEffect(() => {
        if (socket && setIsOnline) {
            socket.on(IS_ONLINE, data => {
                let id = data.userId;
                if (chattingWith?._id === id)
                    setIsOnline(data.online);
            });
        }
    }, [socket, setIsOnline, chattingWith?._id]);

    useEffect(() => {
        if (socket && chattingWith) {
            socket.emit(IS_ONLINE, { userId: chattingWith._id });
        }
    }, [chattingWith, socket]);

    return (
        <StyledHeader>
            {
                chattingWith && (
                    <>
                        <img src={chattingWith.dp} alt='dp' />
                        <div className="infoContainer">
                            <p className='userName'>
                                {chattingWith.userName}
                                {
                                    chattingWith.isVerified && <Icon icon={GoVerified} size='15px' title='verified profile' />
                                }
                            </p>
                            {isOnline && <p className="isOnline" >Online</p>}
                        </div>
                        <div className="actions">
                            <Icon icon={IoIosCall} title='call' onClick={call} />
                            <Icon icon={IoIosVideocam} title='video call' onClick={videoCall} />
                            <Icon icon={BsThreeDotsVertical} onClick={toggleMenu} />
                            <Menu displayMenu={displayMenu} />
                        </div>
                    </>
                )
            }
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    background-color: ${props => props.theme.primary.dark};
    box-shadow:0 0 3px ${props => props.theme.primary.dark};
    padding:0px ${props => props.theme.spacing};
    color:white;
    display:flex;
    align-items: center;
    position: relative;

    &>img{
        height:50px;
        width:50px;
        object-fit: cover;
        object-position: center center;
        border-radius: 50%;
    }

    &>.infoContainer{
        margin-left:${props => props.theme.spacing};
        &>.userName{
            font-size:1.5em;
            text-transform: capitalize;
            &>.icon{
                margin-left:5px;
            }
        }
        &>.isOnline{
            font-size:.8em;
            margin-left:2px;
        }
    }

    &>.actions{
        position:absolute;
        right:${props => props.theme.spacing};
        &>.icon:nth-child(1){
            margin-right:15px;
        }
        &>.icon:nth-child(2){
            margin-right:7px;
        }
    }
`;

export default Header;