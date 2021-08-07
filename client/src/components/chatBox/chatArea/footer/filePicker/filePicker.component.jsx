import React, { useRef, useState, useCallback, useContext, useEffect } from 'react';
import Icon from '../../../../../reusableComponents/icon/icon.component';
import { FaPaperclip } from 'react-icons/fa';
import axios from 'axios';

//importing context
import FormDataContext from '../formDataContext/formdata.context';

//importing services
import { post_upload } from '../../../../../services/services';

const FilePicker = ({ media }) => {
    const fileInputRef = useRef();
    const [file, setFile] = useState(null);
    const { setMedia, send } = useContext(FormDataContext);

    const clickHandler = useCallback(() => {
        fileInputRef.current.click();
    }, [fileInputRef]);

    const changeHandler = useCallback((e) => {
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
                let uploadedUrl = res.data.url;
                setMedia({ url: uploadedUrl, type: 'document' });
                setFile(uploadedUrl);
            })
            .catch(err => {
                console.log(err);
                alert('cannot upload document');
            });
    }, [setMedia, setFile]);

    useEffect(() => {
        if (media && media.type === 'document' && file) {
            send();
            setFile(null);
        }
    }, [media, setFile, file])

    return (
        <>
            <input type='file' style={{ display: 'none' }} ref={fileInputRef} onChange={changeHandler} />
            <Icon icon={FaPaperclip} size='21px' onClick={clickHandler} />
        </>
    );
}

export default FilePicker;