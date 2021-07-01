import React, { useCallback, useState } from 'react';
import Icon from '../../../../../reusableComponents/icon/icon.component';
import { AiOutlineGif } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';

//importing reusableComponent
import SearchInput from '../../../../../reusableComponents/searchInput/searchInput.component';
import Button from '../../../../../reusableComponents/button/button.component';
import Loading from '../../../../../reusableComponents/loading/loading.component';

//importing services
import { getGif } from '../../../../../services/services';

//importing icon
import sendIcon from './sendIcon.png';

const GifPicker = () => {

    const [showPicker, setShowPicker] = useState(false);
    const [search, setSearch] = useState('');
    const [gif, setGif] = useState([]);

    const searchGif = useCallback(() => {
        //fetch gif
        axios
            .get(getGif({ query: search, page: 0 }))
            .then(res => {
                setGif(res.data.data);
            })
            .catch(err => {
                console.log(err);
                alert("can't fetch gif's");
            });
    }, [setGif, search]);

    const togglePicker = useCallback(() => {
        setShowPicker(prevState => {
            if (prevState) {
                //execute before closing
                setSearch('');
                setGif([]);
            }
            else {
                //execute before opening
                searchGif();
            }
            return !prevState;
        });
    }, [setShowPicker, setGif, setSearch, searchGif]);



    return (
        <>
            <AnimatePresence>
                {
                    showPicker && (
                        <GifContainer variants={variant} initial='close' animate='open' exit='close' tabIndex="1" >
                            <div className="gifPickerHeader">
                                <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search gif' />
                                <Button title='search' onClick={searchGif} />
                                <Icon icon={AiOutlineClose} onClick={togglePicker} />
                            </div>
                            <div className="gifs">
                                <div className="gifs-left">
                                    {
                                        (() => {
                                            let gifArray = [];
                                            for (let i = 0; i < gif.length; i += 2) {
                                                gifArray.push(
                                                    <div style={{ '--icon': `url(${sendIcon})` }} key={gif[i]?.id}>
                                                        <img id={gif[i]?.id} src={gif[i]?.images?.downsized?.url} alt={gif[i]?.title} loading='lazy' />
                                                    </div>
                                                );
                                            }
                                            return gifArray;
                                        })()
                                    }
                                </div>
                                <div className="gifs-right">
                                    {
                                        (() => {
                                            let gifArray = [];
                                            for (let i = 1; i < gif.length; i += 2) {
                                                gifArray.push(
                                                    <div style={{ '--icon': `url(${sendIcon})` }} key={gif[i]?.id}>
                                                        <img id={gif[i]?.id} src={gif[i]?.images?.downsized?.url} alt={gif[i]?.title} loading='lazy' />
                                                    </div>
                                                );
                                            }
                                            return gifArray;
                                        })()
                                    }
                                </div>
                            </div>
                            <Loading />
                        </GifContainer>
                    )
                }
            </AnimatePresence>
            <Icon icon={AiOutlineGif} size='30px' onClick={togglePicker} />
        </>
    );
}

const GifContainer = styled(motion.div)`
    position:absolute;
    bottom:95%;
    left:5%;
    color:black;
    background-color:white;
    border:1px solid #ccc;
    box-shadow:0 0 3px #ccc;
    height:400px;
    width:400px;
    border-radius:10px;
    padding:0 2px;
    overflow-y:scroll;
    
    &>.gifPickerHeader{
        display:flex;
        align-items:center;
        height:12%;
        border-bottom:1px solid #ccc;
        position:sticky;
        top:0;
        left:0;
        background-color:white;
        z-index:1;

        &>div{
           flex-grow:1;
        }

        &>.icon{
            color:${props => props.theme.primary.dark};
            //transform:translateX(5px);
        }
    }

    &>.gifs{
        margin-top:3px;
        line-height:0px;
        &>.gifs-right,
        &>.gifs-left{
            width:calc( 50% - 2px );
            display:inline-block;
            vertical-align: top;
            
            &>div{
                width:100%;
                display: inline-block;
                margin-top:2px;
                position:relative;
                
                &>img{
                    width:100%;
                    max-width:100%;
                }

                &:hover{
                    cursor:pointer;
                }

                &:hover::after{
                    content:'';
                    background-image: var(--icon);
                    background-repeat: no-repeat;
                    background-size:60px 60px;
                    background-position: center;
                    position:absolute;
                    top:0;
                    left:0;
                    height:100%;
                    width:100%;
                    background-color:rgba(0,0,0,.9);
                }
            }
        }

        &>.gifs-right{
            margin-left:1px;
        }

        &>.gifs-left{
            margin-right:1px;
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

export default GifPicker;