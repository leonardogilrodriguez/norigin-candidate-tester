'use client';

import { useTimeStore } from '@/src/stores/timeStore';
import styles from './SchedulesItem.module.css';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

const SchedulesItem = ({ schedule, isActive }: { schedule: Schedule, isActive: boolean }) => {
  const { id, scheduleWidth, startMinutes: start = 0, endMinutes: end = 0, timeLiteral } = schedule;
  const ref = useRef<HTMLAnchorElement>(null)
  const now = useTimeStore((state) => state.currentMinute);

  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.focus();
    }
  }, [isActive]);

  const customStyle = {
    width: `${scheduleWidth}px`
  }

  const currentlyPlaying = now >= start && now < end;
  const itemClassNames = `${styles.scheduleItem} ${currentlyPlaying ? styles.currentlyPlaying : ''}`;

  return (
    <Link
      ref={ref}
      className={itemClassNames}
      style={customStyle}
      href={`/program/${id}`}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
    >
      <span>{schedule.title}</span>
      <span className={styles.itemHour}>{timeLiteral}</span>
    </Link>
  )
}

export default React.memo(SchedulesItem);