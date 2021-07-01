import React, { useState, useCallback, useEffect, useContext } from 'react';
import Icon from '../../../../../reusableComponents/icon/icon.component';
import { FaSmile } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

//importing context
import FormdataContext from '../formDataContext/formdata.context';

//importing reusableComponent
import SearchInput from '../../../../../reusableComponents/searchInput/searchInput.component';
import Button from '../../../../../reusableComponents/button/button.component';
import Loading from '../../../../../reusableComponents/loading/loading.component';

//importing services
import { getEmojiCategories, getAllEmojis, getEmojis, searchEmoji } from '../../../../../services/services';

const EmojiPicker = ({ inputRef }) => {
    const [shoPicker, setShowPicker] = useState(false);
    const [search, setSearch] = useState('');
    const [emojiList, setEmojiList] = useState([]);
    const [emojiCategories, setEmojiCategories] = useState([]);
    const [activeEmojiCategory, setActiveEmojiCategory] = useState('All');

    const { setMessage } = useContext(FormdataContext);

    const fetchAllEmojis = useCallback(() => {
        //get All emojis    
        axios
            .get(getAllEmojis)
            .then(res => setEmojiList(res.data))
            .catch(err => {
                console.log(err);
                alert("can't fetch emoiis");
            });
    }, []);

    const getEmojiCategoryWise = useCallback((e) => {
        let category = e.target.innerHTML;
        setActiveEmojiCategory(category);
        if (category === 'All') {
            fetchAllEmojis();
        }
        else {
            axios
                .get(getEmojis(category))
                .then(res => setEmojiList(res.data))
                .catch(err => {
                    console.log(err);
                    alert("can't fetch emojis");
                });
        }
    }, [fetchAllEmojis]);

    const fetchSearchEmoji = useCallback(() => {
        axios
            .get(searchEmoji(search))
            .then(res => setEmojiList(res.data))
            .catch(err => {
                console.log(err);
                alert("can't fetch emojis");
            });
    }, [search]);

    useEffect(() => {
        //get All categories
        axios
            .get(getEmojiCategories)
            .then(res => setEmojiCategories(res.data))
            .catch(err => {
                console.log(err);
                alert("can't fetch emoji categories");
            });
        fetchAllEmojis();
    }, [fetchAllEmojis]);

    const togglePicker = useCallback(() => {
        setShowPicker(prevState => {
            prevState && setSearch('');
            return !prevState;
        });
    }, [setShowPicker]);

    const appendToInput = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setMessage(prevState => prevState + e.target.innerText);
        inputRef.current?.focus();
    }, [setMessage, inputRef]);

    return (
        <>
            <AnimatePresence>
                {
                    shoPicker && (
                        <EmojisContainer variants={variant} initial='close' animate='open' exit='close' >
                            <div className="emojiContainerHeader">
                                <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search emojis' />
                                <Button title='search' onClick={fetchSearchEmoji} />
                                <Icon icon={AiOutlineClose} onClick={togglePicker} />
                            </div>
                            <div className="emoji-categories">
                                <div className={`emoji-category ${activeEmojiCategory === 'All' ? 'active' : null}`} onClick={getEmojiCategoryWise}>
                                    All
                                </div>
                                {
                                    emojiCategories && emojiCategories.length
                                        ? emojiCategories.map((item, index) => (
                                            <div className={`emoji-category ${activeEmojiCategory === item.slug ? 'active' : null}`} key={index} onClick={getEmojiCategoryWise}>
                                                {item.slug}
                                            </div>
                                        ))
                                        : <Loading />
                                }
                            </div>
                            <div className="emojis">
                                {
                                    emojiList
                                        ? emojiList.map((item, index) => <span onClick={appendToInput} key={index + item.codePoint}>{item.character}</span>)
                                        : <div>No Result Found</div>
                                }
                            </div>
                        </EmojisContainer>
                    )
                }
            </AnimatePresence>
            <Icon icon={FaSmile} onClick={togglePicker} />
        </>
    );
}

const EmojisContainer = styled(motion.div)`
    position:absolute;
    bottom:95%;
    left:0;
    color:black;
    background-color:white;
    border:1px solid #ccc;
    box-shadow:0 0 3px #ccc;
    height:400px;
    width:400px;
    border-radius:10px;
    padding:0px 2px;
    overflow-y:scroll;

    &>.emojiContainerHeader{
        display:flex;
        align-items:center;
        height:12%;
        border-bottom:1px solid #ccc;
        position:sticky;
        top:0;
        left:0;
        background-color:white;

        &>div{
           flex-grow:1;
        }

        &>.icon{
            color:${props => props.theme.primary.dark};
            //transform:translateX(5px);
        }
    }

    &>.emoji-categories{
        display:flex;
        flex-flow:row nowrap;
        align-items:center;
        border-bottom:1px solid #ccc;
        overflow-x:scroll;
        overflow-y:hidden;
        height:11%;
        position:sticky;
        top:12%;
        left:0;
        background-color:white;

        &>.emoji-category{
            padding:3px 12px;
            background-color:${props => props.theme.primary.dark};
            border-radius:20px;
            white-space: nowrap;
            margin:0 2px;
            color:white;
            cursor: pointer;
            text-transform:capitalize;
            font-size:.85em;

            &.active{
                color:${props => props.theme.primary.dark};
                border:1px solid ${props => props.theme.primary.dark};
                background-color:white;
                font-weight:bold;
            }
        }
    }

    &>.emojis{
        display:flex;
        flex-flow:row wrap;
        align-items: center;
        justify-content: flex-start;
        align-content: flex-start;
        max-width:100%;
        min-height:77%;
        overflow-x:hidden;
        &>span{
            display:inline-block;
            height:41px;
            width:41px;
            text-align:center;
            font-size:30px;
            margin:2px 1px;
            &:hover{
                cursor:pointer;
            }
        }
        &>div{
            position:absolute;
            top:5%0;
            left:50%;
            transform:translate(-50%,-20%);
            color:#ccc;
            font-size:40px;
            white-space: nowrap;
        }
    }
`;

const variant = {
    open: {
        opacity: 1,
        height: 400
    },
    close: {
        opacity: 0,
        height: 0
    }
}

export default EmojiPicker;