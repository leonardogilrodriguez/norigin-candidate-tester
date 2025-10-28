'use client';

import styles from './timer.module.css';
import { useState } from 'react';
import { useTimeStore } from '@/src/stores/timeStore';

const Timer = ({ initMinutes } : { initMinutes: number }) => {
    const [time, setTime] = useState(initMinutes);

    const now = useTimeStore((state) => state.currentMinute);
    if (now !== time) {
        setTime(now);
    }

    const overrideStyles = {
        left: `calc(${time} * 1px * var(--pixels-per-minute))`
    };

    return (<div className={styles.timerLine} style={overrideStyles}></div>);
}
export default Timer