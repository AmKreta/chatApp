import React, { useContext, useState } from 'react';

//importing custom components
import Search from './search/search.component';
import ChatList from './chatList/chatList.component';
import Contacts from './contacts/contacts.component';
import SearchResult from './searchResult/searchResult.component';

//importing context
import TabsContext from '../tabs.context';

//importing tyabs
import { CHAT, CONTACT, SEARCH } from '../tabs';
import styled from 'styled-components';

const Main = () => {
    const { activeTab } = useContext(TabsContext);
    const [list, setList] = useState([]);
    /*
        list to render contacts, chatList, searchResult
    */
    return (
        <StyledMain>
            <Search setList={setList} />
            {
                (() => {
                    switch (activeTab) {
                        case CHAT: return <ChatList list={list} setList={setList} />
                        case CONTACT: return <Contacts list={list} setList={setList} />
                        case SEARCH: return <SearchResult list={list} setList={setList} />
                    }
                })()
            }
        </StyledMain>
    );
};

const StyledMain = styled.main`
    &>div:nth-child(2){
        height:90%;
        width:100%;
        display:flex;
        flex-flow:column nowrap;
        align-items: center;
        overflow-y:scroll;
        overflow-x:hidden;
    }
`;
export default Main;