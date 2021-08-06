import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';

//importing reusable components
import Button from '../../reusableComponents/button/button.component';

//importing actions
import { deleteCurrentUser, deleteTokens, deleteContacts, deleteChat, deleteChatList } from '../../actions/actions';

const Logout = () => {

    const dispatch = useDispatch();
    const user = useSelector(statr => statr.user);
    const history = useHistory();

    const logoutHandler = useCallback(() => {
        dispatch(deleteChat());
        dispatch(deleteChatList());
        dispatch(deleteContacts());
        dispatch(deleteTokens());
        dispatch(deleteCurrentUser());
        history.push('/auth');
    }, [dispatch, history]);

    const cancelHandler = useCallback(() => {
        history.goBack();
    }, [history]);

    return (
        <Overlay>
            <div className="modal">
                <div className="dp">
                    <img src={user?.dp} alt={user?.userName} />
                </div>
                <p className='userName'>{user?.userName}</p>
                <p>
                    <strong>Are you sure you want to logout?</strong>
                </p>
                <div className="actions">
                    <Button title='Logout' color='error' onClick={logoutHandler} />
                    <Button title='Cancel' color='sucess' onClick={cancelHandler} />
                </div>
            </div>
        </Overlay>
    );
}

const Overlay = styled(motion.div)`
    background-color:rgba(0,0,0,.8);
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;

    &>.modal{
       padding:${props => props.theme.spacing};
        background-color:white;
        border-radius:${props => props.theme.spacing};
        border:1px solid #ccc;
        box-shadow:0 0 5px #ccc, 0 0 5px #bbb inset;
        text-align:center;

        &>*{
            margin: ${props => props.theme.spacing} auto;
        }

        &>.userName{
            font-size:2.2em;
            text-transform: capitalize;
        }

        &>.dp{
            width:200px;
            height:200px;

            &>img{
                height:100%;
                width:100%;
                object-fit:cover;
                border-radius:50%;
            }
        }
        &>.actions{
            display:flex;
            justify-content:space-around;
        }
    }
`;

export default Logout;