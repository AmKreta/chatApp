import React, { useContext, useEffect } from 'react';

//importing context
import ChattingWithContext from '../../chattingWith.context';

const Main = () => {
    const { chattingWith } = useContext(ChattingWithContext)
    useEffect(() => {
        console.log(chattingWith);
    }, [chattingWith]);
    return (
        <main>
            main
        </main>
    );
};

export default Main;