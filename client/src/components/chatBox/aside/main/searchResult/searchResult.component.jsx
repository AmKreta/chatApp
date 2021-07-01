import React from 'react';
import styled from 'styled-components';


//importing reusable components
import ProfileCard from '../../../../../reusableComponents/profileCard/profileCard.component';

const ChatList = ({ list }) => {
    return (
        <Container className="chatList">
            {
                list.length === 0 ? <p>Type in search box to search</p> : null
            }
            {
                list.map(item => (
                    <ProfileCard
                        userName={item.userName}
                        dp={item.dp}
                        status={item.status}
                        key={item._id}
                        isVerified={item.isVerified}
                    />
                ))
            }
            {
                list.map(item => (
                    <ProfileCard
                        userName={item.userName}
                        dp={item.dp}
                        status={item.status}
                        key={item._id}
                        isVerified={item.isVerified}
                    />
                ))
            }
            {
                list.map(item => (
                    <ProfileCard
                        userName={item.userName}
                        dp={item.dp}
                        status={item.status}
                        key={item._id}
                        isVerified={item.isVerified}
                    />
                ))
            }
            {
                list.map(item => (
                    <ProfileCard
                        userName={item.userName}
                        dp={item.dp}
                        status={item.status}
                        key={item._id}
                        isVerified={item.isVerified}
                    />
                ))
            }
            {
                list.map(item => (
                    <ProfileCard
                        userName={item.userName}
                        dp={item.dp}
                        status={item.status}
                        key={item._id}
                        isVerified={item.isVerified}
                    />
                ))
            }
            {
                list.map(item => (
                    <ProfileCard
                        userName={item.userName}
                        dp={item.dp}
                        status={item.status}
                        key={item._id}
                        isVerified={item.isVerified}
                    />
                ))
            }
            {
                list.map(item => (
                    <ProfileCard
                        userName={item.userName}
                        dp={item.dp}
                        status={item.status}
                        key={item._id}
                        isVerified={item.isVerified}
                    />
                ))
            }
            {
                list.map(item => (
                    <ProfileCard
                        userName={item.userName}
                        dp={item.dp}
                        status={item.status}
                        key={item._id}
                        isVerified={item.isVerified}
                    />
                ))
            }
            {
                list.map(item => (
                    <ProfileCard
                        userName={item.userName}
                        dp={item.dp}
                        status={item.status}
                        key={item._id}
                        isVerified={item.isVerified}
                    />
                ))
            }
        </Container>
    );
}

const Container = styled.div`
    overflow-y:scroll;
    &>p{
        color:#beb8b8;
        font-size:1.3em;
        height:100%;
        width:100%;
        display:flex;
        align-items:center;
        justify-content: center;
    }
`;
export default ChatList;