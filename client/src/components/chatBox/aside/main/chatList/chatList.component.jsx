import React, { useContext, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

//importing context
import TabsContext from '../../tabs.context';

//importing tabs name
import { CONTACT } from '../../tabs';
import { useEffect } from 'react';

//importing actions
import { updateChatList } from '../../../../../actions/actions';

//importing custom components
import ChatListCard from '../../../../../reusableComponents/chatListCard/chatListCard.component';

const ChatList = () => {

    // 3 aside tabs -chat, contact ,search
    const { setActiveTab } = useContext(TabsContext);

    const goToContacts = useCallback(() => {
        setActiveTab(CONTACT);
    }, [setActiveTab]);

    const chatList = useSelector(state => state.chatList);
    const userId = useSelector(state => state.user._id);

    const dispatch = useDispatch();

    useEffect(() => {
        if (userId && dispatch) {
            dispatch(updateChatList(userId));
        }
    }, [dispatch, userId]);

    return (
        <ChatContainer >
            {
                chatList?.length
                    ? chatList.map((item) => <ChatListCard key={item._id} {...item} />)
                    : (
                        <div className='noDataFound'>
                            <p>Chat List is empty</p>
                            <p>Go to <u onClick={goToContacts}>contacts</u> and start chatting</p>
                        </div>
                    )

            }
        </ChatContainer>
    );
}

const ChatContainer = styled.div`
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