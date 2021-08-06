import React from 'react';
import { Field, ErrorMessage } from 'formik';
import Styled from 'styled-components';
import { IconContext } from 'react-icons';

const Input = ({ type, label, placeholder, id, icon, ...inputProps }) => {
    return (
        <FormControl>
            {
                label && <label htmlFor={label}>{label}</label>
            }
            <div className="inputContainer">
                {
                    icon && <IconContext.Provider value={{ className: 'inputIcon' }}>{icon()}</IconContext.Provider>
                }
                <Field
                    type={type}
                    placeholder={placeholder}
                    name={id}
                    id={id}
                    autoComplete='off'
                    {...inputProps}
                />
            </div>
            <ErrorMessage
                name={id}
                component='div'
                className='erroredInput'
            />
        </FormControl>
    );
}

const FormControl = Styled.div`
    margin:5px 0;
    &>label{
        text-transform:capitalize;
        font-size:1.1em;
        margin-left:5px;
        display:block;
        text-align:left;
        font-weight:500;
    }
    &>.inputContainer{
        display:flex;
        flex-flow:row nowrap;
        align-items:center;
        justify-content:space-between;
        background-color:white;
        border:1px solid black;
        border-radius:10px;
        padding:0 5px;
        margin:5px 0;
        &>input{
            flex-grow:1;
            padding:5px;
            border:none;
            outline:none;
            background:transparent;
            font-size:1.1em;
        }
        &>.inputIcon{
            height:23px;
            width:23px;
            margin-right:5px;
        }
    }
    &>.erroredInput{
        text-align:left;
        text-transform:capitalize;
        font-size:1.1em;
        color:${props => props.theme.error.dark};
        margin-left:5px;
    }
`;

export default Input;