import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

//importing context
import TabsContext from '../../tabs.context';

//importing tabs name
import { SEARCH } from '../../tabs';

const ChatList = ({ list }) => {
    const { setActiveTab } = useContext(TabsContext);

    const goToSearch = useCallback(() => {
        setActiveTab(SEARCH);
    }, [setActiveTab]);

    return (
        <ContactsContainer>
            {
                list.length
                    ? list.map((item, index) => <p key={index}>{item}</p>)
                    : (
                        <div className="noDataFound">
                            <p>No contacts</p>
                            <p><u onClick={goToSearch}>Search </u> users to chat with them</p>
                        </div>
                    )
            }
        </ContactsContainer>
    );
}

const ContactsContainer = styled.div`
      &>.noDataFound{
        height:100%;
        width:100%;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-flow:column nowrap;
        color:#beb8b8;
        font-size:1.3em;
        text-align:center;
        &>p>u{
            cursor:pointer;
        }
    }
`;

export default ChatList;