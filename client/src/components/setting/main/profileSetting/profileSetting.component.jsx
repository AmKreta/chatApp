import React, { useCallback, useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './profileSetting.styles.css';

//importing reusable components
import Accordian from '../../../../reusableComponents/accordian/accordian.component';
import FormikInput from '../../../../reusableComponents/formikInput/formikInput.component';
import Button from '../../../../reusableComponents/button/button.component';

//importing icons
import { BsFillPersonFill, BsPersonFill } from 'react-icons/bs'
import { MdPhone } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { RiUserSettingsFill } from 'react-icons/ri';
import { BiReset } from 'react-icons/bi';

//importing services 
import { post_upload, put_updateUser } from '../../../../services/services';

//importing actions
import { updateCurrentUser } from '../../../../actions/actions';

const ProfileSetting = () => {

    const user = useSelector(state => state.user);

    const fileInputRef = useRef(null);

    const dispatch = useDispatch();

    const validationSchema = useMemo(() => Yup.object({
        userName: Yup.string().required('required'),
        phoneNo: Yup.string().required('required'),
        status: Yup.string().required('required'),
        dp: Yup.string().required('required')
    }), []);

    const initialValues = useMemo(() => ({
        userName: user.userName,
        phoneNo: user.phoneNo,
        status: user.status,
        dp: user.dp
    }), [user]);

    const submitHandler = useCallback((values, formikProps) => {
        axios({
            method: 'put',
            url: put_updateUser,
            data: values
        })
            .then(res => {
                dispatch(updateCurrentUser(res.data.payload));
                alert('updated');
                formikProps.setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
                alert('cant update users details');
            })
    }, [dispatch]);

    const selectImageFile = useCallback((e) => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, [fileInputRef]);

    const setImage = useCallback((e, setFieldValue) => {
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        axios({
            method: 'post',
            url: post_upload,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                setFieldValue('dp', res.data.url);
            })
            .catch(err => {
                console.log(err);
                alert('unable to upload file');
            })
    }, []);

    return (
        <Accordian icon={BsFillPersonFill} title='Profile Setting'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                validateOnBlur
                validateOnChange={false}
                onSubmit={submitHandler}
            >
                {
                    formik => {
                        const { setFieldValue, values } = formik;
                        return (
                            <Form id='profileUpdateForm'>
                                <div className="dpContainer">
                                    <img src={values.dp} alt='user' title='change profile picture' onClick={selectImageFile} />
                                    <input type='file' style={{ display: 'none' }} ref={fileInputRef} onChange={(e) => { e.persist(); setImage(e, setFieldValue); }} />
                                </div>
                                <FormikInput type='text' label='username' placeholder='enter username' id='userName' icon={BsPersonFill} />
                                <FormikInput type='number' label='phone no.' placeholder='enter phone no.' id='phoneNo' icon={MdPhone} />
                                <FormikInput type='text' label='status' placeholder='enter status' id='status' icon={FaPencilAlt} />
                                <div className="formAction">
                                    <Button
                                        title='Update'
                                        color='sucess'
                                        frontIcon={RiUserSettingsFill}
                                    />
                                    <Button
                                        title='Reset'
                                        color='error'
                                        frontIcon={BiReset}
                                    />
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </Accordian>
    );
}

export default ProfileSetting;

