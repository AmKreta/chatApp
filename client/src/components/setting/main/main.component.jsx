import React from 'react';
import styled from 'styled-components';

//importing custom components
import ProfileSetting from './profileSetting/profileSetting.component';
import ContactSetting from './contactsSetting/contactSetting.component';

const Main = () => {
    return (
        <StyledMain>
            <ProfileSetting />
            <ContactSetting />
        </StyledMain>
    );
}

const StyledMain = styled.main`
    min-height:90%;
    width:100%;
    padding:0 ${props => props.theme.spacing};
    padding-bottom:${props => props.theme.spacing};
    display:flex;
    flex-flow:column nowrap;
    align-items:center;
    justify-content:flex-start;
`;

export default Main;