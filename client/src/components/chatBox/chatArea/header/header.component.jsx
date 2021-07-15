import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

//importing context
import ChattingWithContext from '../../chattingWith.context';
import SocketContext from '../../../../context/socket.context';

//importing reusable components
import Icon from '../../../../reusableComponents/icon/icon.component';

//importing icons
import { GoVerified } from 'react-icons/go';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoIosVideocam, IoIosCall } from 'react-icons/io';

//importing services
import { IS_ONLINE } from '../../../../services/socket.events';

const Header = () => {
    const { chattingWith } = useContext(ChattingWithContext);
    const socket = useContext(SocketContext);

    const [isOnline, setIsOnline] = useState(false);

    useEffect(() => {
        if (socket && setIsOnline) {
            socket.on(IS_ONLINE, data => setIsOnline(data));
        }
    }, [socket, setIsOnline])

    useEffect(() => {
        if (socket && chattingWith) {
            socket.emit(IS_ONLINE, { userId: chattingWith._id });
        }
    }, [chattingWith, socket])

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
                            <Icon icon={IoIosCall} title='call' />
                            <Icon icon={IoIosVideocam} title='video call' />
                            <Icon icon={BsThreeDotsVertical} />
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