'use client';

import { useTimeStore } from '@/src/stores/timeStore';
import styles from './SchedulesItem.module.css';
import Link from 'next/link';
import React from 'react';

const SchedulesItem = ({ schedule }: { schedule: Schedule }) => {
  const { id, scheduleWidth, startMinutes: start = 0, endMinutes: end = 0, timeLiteral } = schedule;
  const now = useTimeStore((state) => state.currentMinute);

  const customStyle = {
    width: `${scheduleWidth}px`
  }

  const currentlyPlaying = now >= start && now < end;
  const itemClassNames = `${styles.scheduleItem} ${currentlyPlaying ? styles.currentlyPlaying : ''}`;

  return (
    <Link className={itemClassNames} style={customStyle} href={`/program/${id}`}>
      <span>{schedule.title}</span>
      <span className={styles.itemHour}>{timeLiteral}</span>
    </Link>
  )
}

export default React.memo(SchedulesItem);