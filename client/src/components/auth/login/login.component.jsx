import React, { useMemo, useCallback, useState, useRef } from 'react';
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

//importing asyncrequest
import asyncRequest from '../../../util/asyncRequest';

//importing actions
import { updateCurrentUser } from '../../../actions/actions';

//importing services
import { get_login } from '../../../services/services';
import DummyCredentials from './dummyCredentials.component';

const Login = ({ history }) => {

    const dispatch = useDispatch();
    const [showError, setShowError] = useState(false);
    const formikRef = useRef(null);

    const initialValues = useMemo(() => ({
        userName: '',
        password: ''
    }), []);

    const validationSchema = useMemo(() => yup.object({
        userName: yup.string().required('username is required !'),
        password: yup.string().required('password is required !')
    }), []);

    const submitHandler = useCallback((values, action) => {
        asyncRequest({
            method: 'get',
            url: get_login,
            params: values
        }).then(res => {
            dispatch(updateCurrentUser(res));
            history.push('/');
        }).catch(err => {
            console.log(err);
            setShowError(true);
        })
        .finally(()=>{
            formikRef.current?.setSubmitting(false);
        })
    }, [dispatch, history]);

    const goToSignup = useCallback(() => {
        history.push(`/auth/signup`);
    }, [history]);

    const insertDummyCredentials = (username, password)=>{
        formikRef.current?.setFieldValue?.('userName', username);
        formikRef.current?.setFieldValue?.('password', password);
    }

    return (
        <LoginForm className="loginForm" variants={variant} initial='initial' animate='animate' exit='exit'>
            <DummyCredentials onCopyCredentials={(username, password)=>insertDummyCredentials(username, password)}/>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur
                validateOnMount
                onSubmit={submitHandler}
                innerRef={formikRef}
            >
                {({isSubmitting})=><Form>
                    <h1>Login</h1>
                    <Input type='text' label='username' placeholder='enter username' id='userName' icon={BsPersonFill} />
                    <Input type='password' label='password' placeholder='enter password' id='password' icon={RiLockPasswordFill} />
                    <div className="form-action">
                        <Button title='Login' type='submit' color='primary' loading={isSubmitting}/>
                        <Button title='Reset' type='reset' color='error' loading={isSubmitting}/>
                    </div>
                </Form>}
            </Formik>
            {
                showError
                    ?<motion.div className='errorContainer' initial={{height:0, top:-10}} animate={{height:'auto', top:'auto'}}>
                        either username of password is incorrect
                    </motion.div>
                    :null
            }
            <div className="goToSignup">
                <p>don't have an account ?</p>
                <Button title='Signup' onClick={goToSignup} />
            </div>
        </LoginForm>
    );
}

const LoginForm = Styled(motion.div)`
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

    &>.goToSignup{
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
        opacity: 0
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
