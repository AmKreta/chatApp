import React, { useRef, useState, useCallback } from 'react';
import Icon from '../../../../../reusableComponents/icon/icon.component';
import { FaPaperclip } from 'react-icons/fa';

const FilePicker = () => {
    const [file, setFile] = useState(null);
    const fileInputRef = useRef();

    const clickHandler = useCallback(() => {
        fileInputRef.current.click();
    }, [fileInputRef]);

    const changeHandler = useCallback((e) => {
        setFile(e.target.files[0]);
    }, [setFile]);

    return (
        <>
            <input type='file' style={{ display: 'none' }} ref={fileInputRef} value={file} onChange={changeHandler} />
            <Icon icon={FaPaperclip} size='21px' onClick={clickHandler} />
        </>
    );
}

export default FilePicker;