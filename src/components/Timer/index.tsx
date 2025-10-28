'use client';

import styles from './timer.module.css';
import { useEffect, useState } from 'react';
import { totalMinutesFromMidnight } from '@utils/dates';

const Timer = ({ initMinutes } : { initMinutes: number }) => {
    const [time, setTime] = useState(initMinutes);

    useEffect(() => {
        const interval = setInterval(() => {
            const calculateMinutes = totalMinutesFromMidnight();
            setTime(calculateMinutes);
        }, 60000);
        
        const initialMinutes = totalMinutesFromMidnight();
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTime(initialMinutes);

        return () => clearInterval(interval);
    }, []);

    const overrideStyles = {
        left: `calc(${time} * 1px * var(--pixels-per-minute))`
    };

    return (<div className={styles.timerLine} style={overrideStyles}></div>);
}
export default Timer