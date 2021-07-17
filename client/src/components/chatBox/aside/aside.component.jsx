import React, { useState } from 'react';
import styled from 'styled-components';

//importing custom components
import Header from './header/header.component';
import Main from './main/main.component';

//importing tabs
import { CHAT } from './tabs';

//im[porting tabs context
import TabsContext from './tabs.context';

const Aside = () => {
    const [activeTab, setActiveTab] = useState(CHAT);
    return (
        <AsideContainer>
            <TabsContext.Provider value={{ activeTab, setActiveTab }}>
                <Header />
                <Main />
            </TabsContext.Provider>
        </AsideContainer>
    );
};

const AsideContainer = styled.div`
    height:100%;
    width:350px;
    &>header{
        height:10%;
    }
    &>main{
        height:90%;
    }
    &>footer{
        height:10%;
    }
    @media only screen and ( max-width : 700px ){
        position:absolute;
        top:0;
        left:-100%;
    }
`;

export default Aside;