import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './contactSetting.styles.css';
import styled from 'styled-components';

//importing reusable components
import Accordian from '../../../../reusableComponents/accordian/accordian.component';
import Chips from '../../../../reusableComponents/chips/chips.component'
import ProfileCard from '../../../../reusableComponents/contactCard/contactCard.component';
import ContactCard from '../../../../reusableComponents/profileCard/profileCard.component';

//importing icons
import { BsPersonFill } from 'react-icons/bs'

//importing actions
import { updateContacts, updatePendingList, updateFavouriteList } from '../../../../actions/actions';

const ContactSetting = () => {
    const [activeFilter, setActiveFilter] = useState('Contacts');

    const changeFilter = useCallback((e) => {
        setActiveFilter(e.currentTarget.title);
    }, [setActiveFilter]);

    const dispatch = useDispatch();

    const { contact, favContact, pendingList, user } = useSelector(state => state);

    useEffect(() => {
        switch (activeFilter) {
            case 'Contacts': return contact.length === 0 && dispatch(updateContacts(user.contacts));
            case 'Pending': return pendingList.length === 0 && dispatch(updatePendingList(user.pendingContacts));
            case 'Favourite': return favContact.length === 0 && dispatch(updateFavouriteList(user.fav));
            default: console.log('no filter found')
        }
    }, [activeFilter, dispatch, user]);

    return (
        <Accordian title='contactSetting' icon={BsPersonFill}>
            <div className="contactSettingHeader">
                <Chips title='Contacts' onClick={changeFilter} active={activeFilter === 'Contacts'} />
                <Chips title='Favourite' onClick={changeFilter} active={activeFilter === 'Favorite'} />
                <Chips title='Pending' onClick={changeFilter} active={activeFilter === 'Pending'} />
            </div>
            <div className="contactList">
                {
                    (() => {
                        switch (activeFilter) {
                            case 'Contacts': return (
                                contact.length
                                    ? contact.map((item, index) => (
                                        <ProfileCard {...item} key={index} noBorder noChat />
                                    ))
                                    : (
                                        <NotFound className='noRecords'>
                                            no document in contacts
                                        </NotFound>
                                    )
                            );

                            case 'Favourite': return (
                                favContact.length
                                    ? favContact.map((item, index) => (
                                        <ProfileCard {...item} key={index} noBorder noChat />
                                    ))
                                    : (
                                        <NotFound className='noRecords'>
                                            no document in pending list
                                        </NotFound>
                                    )
                            );

                            case 'Pending': return (
                                pendingList.length
                                    ? pendingList.map((item, index) => (
                                        <ContactCard {...item} key={index} noBorder noChat />
                                    ))
                                    : (
                                        <NotFound className='noRecords'>
                                            no document in pending list
                                        </NotFound>
                                    )
                            );
                            default: return [];
                        }
                    })()
                }
            </div>
        </Accordian>
    );
}

const NotFound = styled.div`
    color:#beb8b8;
    font-weight:500;
    font-size:1.2em;
    padding:20px 0;
`;

export default ContactSetting;