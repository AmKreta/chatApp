import { AnimatePresence, motion } from 'framer-motion';
import React, { useState, useCallback, useRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

const Timer = React.forwardRef((ref) => {
    const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
    console.log(ref);

    /*const startTimer = useCallback(() => {
        timerRef.current = setTimeout(() => {
            setTimer(({ minutes, seconds }) => {
                if (seconds < 59) {
                    setTimer({ minutes, seconds: seconds + 1 });
                }
                else {
                    setTimer({ minutes: minutes + 1, seconds });
                }
            });
        }, 1000);
    }, [timerRef]);

    const pauseTimer = useCallback(() => {
        clearInterval(timerRef.current);
    }, [timerRef]);

    const resetTimer = useCallback(() => {
        setTimer({ minutes: 0, seconds: 0 });
    }, [setTimer]);*/

    useImperativeHandle(ref, () => ({
        alert: () => alert('worked')
    }), []);

    return (
        <Time>
            <AnimatePresence>
                <motion.p key={timer.minutes}>
                    {
                        timer.minutes.length === 1 ? `0 ${timer.minutes}` : timer.minutes
                    }
                </motion.p>
                <motion.p key={timer.seconds}>
                    {
                        timer.seconds.length === 1 ? `0 ${timer.seconds}` : timer.seconds
                    }
                </motion.p>
            </AnimatePresence>
        </Time>
    );
});


const Time = styled(motion.div)`


`;

export default Timer;