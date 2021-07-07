import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

//importing custom components
import Auth from './auth/auth.component';
import ChatBox from './chatBox/chatBox.component';
import Setting from './setting/setting.component';
import ProfileInfo from './profileInfo/profileInfo.component';

//importing theme
import theme from '../theme/theme';

//importing globalStyle
import GlobalStyle from '../globalStyles/globalStyles';

//importing actions
import { updateCurrentUser } from '../actions/actions';
import { updateTokens } from '../actions/actions';

//importing theme context
import ThemeContext from '../context/theme.context';

//importing utils
import AsyncRequest from '../util/asyncRequest';

//importing services
import { get_userById } from '../services/services';

const availThemes = Object.keys(theme);

const Component = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        //check if user details is stored in localstorage
        //set values in redux store if yes
        let user = JSON.parse(localStorage.getItem('user'));
        let token = JSON.parse(localStorage.getItem('token'));
        
        if (user && token) {
            //if users details and tokens are present
            //try to fetch new details of user
            //else continue with old details
            dispatch(updateTokens(token));
            AsyncRequest({
                method: 'get',
                url: get_userById,
                params: { id: user._id }
            })
                .then(res => {
                    console.log(res);
                    dispatch(updateCurrentUser(res));
                })
                .catch(err => {
                    dispatch(updateCurrentUser(user));
                    console.log(err);
                    alert("can't fetch users details");
                });
        }
        else {
            history.push('/auth');
        }
    }, [dispatch, history]);

    const [currentTheme, setCurrentTheme] = useState(availThemes[0]);

    return (
        <ThemeContext.Provider value={setCurrentTheme}>
            <ThemeProvider theme={theme[currentTheme]}>
                <GlobalStyle />
                <Switch>
                    <Route exact path='/' component={ChatBox} />
                    <Route path='/profileInfo/:profileId' component={ProfileInfo} />
                    <Route path='/setting' component={Setting} />
                    <Route path='/auth' component={Auth} />
                    <Redirect to='/404' />
                </Switch>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}


export default Component;