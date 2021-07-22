import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

//importing custom components
import Header from './header/header.component';
import Main from './main/main.component';

//importing tabs
import { CHAT } from './tabs';

//im[porting tabs context
import TabsContext from './tabs.context';

//importing icons
import { MdNavigateNext } from 'react-icons/md';


//importing reusable components
import Icon from '../../../reusableComponents/icon/icon.component';

const Aside = ({ showAside, setShowAside }) => {
    const [activeTab, setActiveTab] = useState(CHAT);
    const toggleAside = useCallback(() => {
        setShowAside(prevState => !prevState);
    }, [setShowAside]);
    return (
        <AsideContainer className={`${showAside ? 'active' : null}`}>
            <TabsContext.Provider value={{ activeTab, setActiveTab }}>
                <Header />
                <Main />
            </TabsContext.Provider>
            <div className='switch' onClick={toggleAside} >
                <Icon icon={MdNavigateNext} />
            </div>
        </AsideContainer>
    );
};

const AsideContainer = styled.div`
    height:100%;
    width:350px;
    position:relative;

    &>header{
        height:10%;
    }
    &>main{
        height:90%;
        background-color: white;
    }
    &>footer{
        height:10%;
    }

    &>.switch{
        display:none;
    }

    @media only screen and ( max-width : 700px ){
        position:absolute;
        top:0;
        width:300px;
        left:-300px;
        z-index:3;
        border-top-right-radius: 30px;
        border-bottom-right-radius: 30px;
        transition:left .3s ease-in-out;

        &.active{
            left:0px;
            box-shadow:1px 0 10px #333;

            &>.switch{
                transform:translate(-30%,-50%) rotateZ(-180deg);
            }
        }

        &>header{
            border-top-right-radius: 30px;
        }

        &>main{
            border-bottom-right-radius: 30px;
            overflow:hidden;
        }

        &>.switch{
            display:flex;
            align-items: center;
            justify-content: center;
            position:absolute;
            height:50px;
            width:50px;
            top:50%;
            left:100%;
            transform:translate(-30%,-50%);
            background-color: ${props => props.theme.primary.dark};
            box-shadow:0 0 5px ${props => props.theme.primary.light};
            border-radius:50%;
            box-shadow:2px 0 10px #333;
            transform-origin: center;
            transition:.3s ease-in-out;
            transition-delay: .2s;

            &>.icon{
                color:white;
            }
        }
    }
`;

export default Aside;