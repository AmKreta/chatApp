import React, { useState, useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { IoIosChatboxes } from 'react-icons/io';
//importing reusable components
import Icon from '../../../../reusableComponents/icon/icon.component';

//importing custom components
import Menu from './menu/menu.component';

//importing context
import TabsContext from '../tabs.context';

//importing tabs
import { CHAT, CONTACT } from '../tabs';

const Header = () => {

    const [displayMenu, setDisplayMenu] = useState(false);
    const dp = useSelector(state => state.user?.dp);
    const { activeTab, setActiveTab } = useContext(TabsContext);

    const toggleMenu = useCallback(() => {
        setDisplayMenu(prevState => !prevState);
    }, [setDisplayMenu]);

    const toggleTab = useCallback((e) => {
        e.stopPropagation()
        e.cancellable = true;
        console.log(e.currentTarget.title);
        setActiveTab(e.currentTarget.title);
    }, [setActiveTab])

    return (
        <StyledHeader dp={dp}>
            <div className="dpContainer">
                <img src={dp} alt="user dp" loading='lazy' />
            </div>
            <nav>
                <ul>
                    <li style={{ borderBottomColor: activeTab === CHAT && 'white' }} title={CHAT} onClick={toggleTab}>
                        <Icon icon={IoIosChatboxes} />
                    </li>
                    <li style={{ borderBottomColor: activeTab === CONTACT && 'white' }} title={CONTACT} onClick={toggleTab}>
                        <Icon icon={FaUserFriends} />
                    </li>
                    <li>
                        <Icon icon={BsThreeDotsVertical} onClick={toggleMenu} />
                        <Menu displayMenu={displayMenu} />
                    </li>
                </ul>
            </nav>
        </StyledHeader>
    );
};

const StyledHeader = styled.header`
    background-color: ${props => props.theme.primary.light};
    box-shadow:0 0 3px ${props => props.theme.primary.dark};
    color:white;
    display:flex;
    align-items:center;
    justify-content: space-between;
    padding:0 ${props => props.theme.spacing};
    
    &>.dpContainer{
        height:50px;
        width:50px;
        overflow:hidden;
        border-radius:50%;
        background-color:#ccc;
        &:hover{
            cursor:pointer;
        }
        &>img{
            max-height:100%;
        }
    }

    &>nav>ul{
        list-style: none;
        &>li{
            display:inline-block;
            transition:.5s ease-in-out;
            &:first-child{
                margin-right:12px;
                border:1px solid transparent;
            }
            &:nth-child(2){
                margin-right:${props => props.theme.spacing};
                border:1px solid transparent;
            }
            &:last-child{
                position:relative;
            }
        }
    }
`;

export default Header;