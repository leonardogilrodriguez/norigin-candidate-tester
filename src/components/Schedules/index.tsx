'use client';
import { totalMinutesFromMidnight } from '@utils/dates';
import styles from './schedulesrow.module.css';
import Timer from '../Timer';
import VirtualizedScheduleRow from './VirtualizedScheduleRow';
import { useEffect } from 'react';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { columnNow, spatialMove } from '@/src/utils/spatialNavigation';

const Schedules = ({ channels }: { channels: Channel[] }) => {
  const calculateMinutes = totalMinutesFromMidnight();
  const { activeRowIndex, activeColIndex, setActiveCell } = useNavigationStore();

  const move = (direction: 'left' | 'right' | 'up' | 'down') => {
    const { newRow, newCol } = spatialMove({ direction, activeRowIndex, activeColIndex, channels }); 
    setActiveCell(newRow, newCol);
  };

  useEffect(() => {
    const column = columnNow(channels);
    setActiveCell(0, column);
  }, [channels, setActiveCell]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        switch (e.key) {
          case 'ArrowLeft': move('left'); break;
          case 'ArrowRight': move('right'); break;
          case 'ArrowUp': move('up'); break;
          case 'ArrowDown': move('down'); break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeRowIndex, activeColIndex, channels]);
  
  return (
    <section className={`${styles.wrapper} fade-in`} role="region" aria-label="scheduled programs in epg">
        <Timer initMinutes={calculateMinutes} />
        {channels.map((channel, rowIndex) => {
            return (
              <VirtualizedScheduleRow key={`schedule-row-${channel.id}`} rowHeight={75} schedules={channel.schedules} rowIndex={rowIndex} />
            );
        })
        }
    </section>
  );
}

export default Schedules;