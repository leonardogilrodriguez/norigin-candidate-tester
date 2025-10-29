'use client';

import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import SchedulesItem from './subcomponents/SchedulesItem';
import { useNavigationStore } from '@/src/stores/navigationStore';

interface VirtualizedScheduleRowProps {
  schedules: Schedule[];
  rowHeight: number;
  rowIndex: number;
}

export default function VirtualizedScheduleRow({
  schedules,
  rowHeight,
  rowIndex,
}: VirtualizedScheduleRowProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const { activeRowIndex, activeColIndex } = useNavigationStore();
  
  const virtualizer = useVirtualizer({
    horizontal: true,
    count: schedules.length,
    getScrollElement: () => document.querySelector('main'), // in the main screen
    estimateSize: (index) => schedules[index].scheduleWidth as number,
    overscan: 5, // apart from the ones in the viewport, 5 on the left and 5 on the right
  });

  return (
    <div
      ref={parentRef}
      style={{
        position: 'relative',
        width: '100%',
        height: rowHeight,
        WebkitOverflowScrolling: 'touch',
      }}
      role="list"
      aria-label="List of programs schedlued by the channel"
    >
      <div
        style={{
          height: '100%',
          width: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const schedule = schedules[virtualItem.index];
          const isActive = activeRowIndex === rowIndex && activeColIndex === virtualItem.index;

          return (
            <div
              key={`vkey-${virtualItem.key}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: `${schedule.scheduleWidth}px`,
                transform: `translateX(${virtualItem.start}px)`,
                willChange: 'transform',
              }}
              role="listitem"
            >
              <SchedulesItem schedule={schedule} isActive={isActive}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}