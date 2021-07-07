import React, { useCallback, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

//importing context
import TabsContext from '../../tabs.context';

//importing tabs name
import { SEARCH } from '../../tabs';

//importing actions
import { updateContacts } from '../../../../../actions/actions';

//importing reusabl;e components
import ContactCard from '../../../../../reusableComponents/contactCard/contactCard.component';

const Contacts = () => {
    const { setActiveTab } = useContext(TabsContext);

    const { contacts, /*fav*/ } = useSelector(state => state.user);
    const contactList = useSelector(state => state.contact);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('ran');
        dispatch(updateContacts(contacts));
    }, [contacts, dispatch])

    const goToSearch = useCallback(() => {
        setActiveTab(SEARCH);
    }, [setActiveTab]);

    return (
        <ContactsContainer>
            {
                contactList.length
                    ? contactList.map((item, index) => (
                        <ContactCard {...item} key={item._id} id={item._id} type='contact' />
                    ))
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

export default Contacts;