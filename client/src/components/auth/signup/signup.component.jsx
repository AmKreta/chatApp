import React, { useMemo, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { motion } from 'framer-motion';
import Styled from 'styled-components';

//importing reusable components
import Input from '../../../reusableComponents/formikInput/formikInput.component';
import Button from '../../../reusableComponents/button/button.component';

//importing icons
import { BsPersonFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdPhone } from 'react-icons/md';

//importing utils
import asyncRequest from '../../../util/asyncRequest';

//importing services
import { post_signup } from '../../../services/services';

//importing actions
import { updateCurrentUser } from '../../../actions/actions';

const Login = ({ history }) => {

    const dispatch = useDispatch();
    const [error, setError] = useState('');

    const initialValues = useMemo(() => ({
        userName: '',
        password: '',
    }), []);

    const validationSchema = useMemo(() => yup.object({
        userName: yup.string().required('username is required !'),
        password: yup.string().required('password is required !')
    }), []);

    const submitHandler = useCallback(async (values, action) => {
        asyncRequest({
            method: 'post',
            url: post_signup,
            body: values
        }).then(res => {
            dispatch(updateCurrentUser(res));
            //goTo main app page
            history.push('/');
        }).catch(err => {
            if(err.response.data.payload?.err.startsWith?.('E11000 duplicate key error')){
                setError('duplicate username : username already exists');
            }
            else{
                setError('something went wrong');
            }
        });
    }, [dispatch, history]);

    const goToLogin = useCallback(() => {
        history.goBack();
    }, [history]);

    return (
        <SignupForm className="signupForm" variants={variant} initial='initial' animate='animate' exit='exit'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur
                validateOnMount
                onSubmit={submitHandler}
            >
                <Form>
                    <h1>Signup</h1>
                    <Input type='text' label='username' placeholder='enter username' id='userName' icon={BsPersonFill} />
                    <Input type='number' label='phone no.' placeholder='enter phone no.' id='phoneNo' icon={MdPhone} />
                    <Input type='password' label='password' placeholder='enter password' id='password' icon={RiLockPasswordFill} />
                    <div className="form-action">
                        <Button title='signup' type='submit' color='primary' />
                        <Button title='Reset' type='reset' color='error' />
                    </div>
                </Form>
            </Formik>
            {
                error
                    ?<motion.div className='errorContainer' initial={{height:0, top:-10}} animate={{height:'auto', top:'auto'}}>
                        {error}
                    </motion.div>
                    :null
            }
            <div className="goToLogin">
                <p>Already have an account ?</p>
                <Button title='Login' onClick={goToLogin} />
            </div>
        </SignupForm>
    );
}

const SignupForm = Styled(motion.div)`
    height:100%;
    width:100%;
    display:flex;
    flex-direction:column;
    flex-wrap:nowrap;
    align-items:center;
    justify-content:center;
    text-align:center;

    &>form{
        &>h1{
            margin-bottom:10px;
            color:${props => props.theme.primary.regular}
        }
        padding:30px;
        margin:20px;
        &>.form-action{
            margin-top:30px;
            display:flex;
            justify-content:space-around;
        }
    }

    &>.goToLogin{
        justify-self:flex-end;
        &>*{
            display:inline-block;
            verticle-align:middle;
        }
    }

    &>.errorContainer{
        margin-bottom:16px;
        color:#d32f2f;
        overflow:hidden;
    }
`;

const variant = {
    initial: {
        y: '-100%',
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            duration: .5
        }
    },
    exit: {
        y: '100%',
        opacity: 0,
        transition: {
            duration: .5
        }
    }
};

export default Login;
