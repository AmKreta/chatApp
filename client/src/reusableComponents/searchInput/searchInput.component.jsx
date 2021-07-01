import React, { useState, useCallback } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import styled from 'styled-components';

//importing reusable components
import Icon from '../icon/icon.component';

const SearchInput = ({ placeholder, value, onChange, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    const toggleIsFocused = useCallback((e) => {
        setIsFocused(prevState => !prevState);
    }, []);

    return (
        <SearchInputContainer isFocused={isFocused} {...props}>
            <Icon icon={HiOutlineSearch} color='grey' size='20px' />
            <input
                type='text'
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onFocus={toggleIsFocused}
                onBlur={toggleIsFocused}
            />
        </SearchInputContainer>
    );
};

const SearchInputContainer = styled.div`
    border:1px solid #ccc;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color:white;
    border-radius:10px;
    overflow:hidden;
    padding:5px ${props => props.theme.spacing};
    opacity:${props => props.isFocused ? 1 : .8};
    box-shadow:${props => props.isFocused ? '0 0 2px #ccc inset,0 0 3px #ccc' : 'none'};

    &> input{
        flex-grow: 1;
        flex-shrink: 1;
        font-size: 15px;
        outline: none;
        padding: 0px ${props => props.theme.spacing};
        border: none;
    }
        
    &>.icon{
        min-width: 20px;
        min-height: 20px;
    }
`;

export default SearchInput;