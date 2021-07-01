import React, { useContext, useCallback } from 'react';
import styled from 'styled-components';

//importing context
import FormDataContext from '../formDataContext/formdata.context';

const Input = ({ value, inputRef }) => {
    const { setMessage, send } = useContext(FormDataContext);

    const changehandler = useCallback((e) => {
        setMessage(e.target.value);
    }, [setMessage]);

    const onKeyDown = useCallback((e) => {
        if (e.key === 'Enter') {
            send();
        }
    }, [send]);

    return (
        <StyledInput
            type="text"
            placeholder='input message...'
            value={value}
            onChange={changehandler}
            onKeyUp={onKeyDown}
            ref={inputRef}
        />
    );
}

const StyledInput = styled.input`
    height:100%;
    flex-grow: 1;
    background:transparent;
    outline:none;
    border:none;
    font-size:1.1em;
`;

export default Input;