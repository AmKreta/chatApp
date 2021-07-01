import React, { useState, useCallback, useContext, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

//importing reusable components
import SearchInput from '../../../../../reusableComponents/searchInput/searchInput.component';
import Icon from '../../../../../reusableComponents/icon/icon.component';

//importing icon
import { FaFilter } from 'react-icons/fa';

//importing context
import TabsContext from '../../tabs.context';

//importing tabs
import { SEARCH } from '../../tabs';

//importing services
import { get_searchUser } from '../../../../../services/services';

const Search = ({ setList }) => {

    const [search, setSearch] = useState('');

    const { setActiveTab } = useContext(TabsContext);

    const inputChangehandler = useCallback((e) => {
        setSearch(e.target.value);
    }, [setSearch]);

    const clickHandler = useCallback(() => {
        setActiveTab(SEARCH);
    }, []);

    useEffect(() => {
        let query = search.trim();
        if (query.length) {
            axios
                .get(`${get_searchUser}?search=${query}`)
                .then(res => {
                    setList(res.data.payload);
                })
                .catch(err => {
                    console.log(err);
                    alert("cant search user")
                })
        }
        else{
            setList([]);
        }
    }, [search]);

    return (
        <SearchContainer>
            <SearchInput value={search} onChange={inputChangehandler} placeholder='search users' onClick={clickHandler} title='search users' />
            <Icon icon={FaFilter} color={search.length?'#beb8b8':'#ccc'} size='22px' title='filter result' />
        </SearchContainer>
    );
};

const SearchContainer = styled.div`
    height:10%;
    width:100%;
    padding:10px;
    border-bottom:1px solid #ccc;
    box-shadow:0 0 3px #ccc;
    display:flex;
    align-items: center;
    justify-content: center;
    
    &>div{
        flex-grow: 1;
    }

    &>.icon{
        margin-left:8px;
    }
`;

export default Search;