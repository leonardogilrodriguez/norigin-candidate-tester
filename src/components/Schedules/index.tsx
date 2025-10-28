import { totalMinutesFromMidnight } from '@utils/dates';
import styles from './schedulesrow.module.css';
import Timer from '../Timer';
import VirtualizedScheduleRow from './VirtualizedScheduleRow';

const Schedules = ({ channels }: { channels: Channel[] }) => {
  const calculateMinutes = totalMinutesFromMidnight();

  return (
    <section className={`${styles.wrapper} fade-in`} role="region" aria-label="scheduled programs in epg">
        <Timer initMinutes={calculateMinutes} />
        {channels.map(channel => {
            return (
              <VirtualizedScheduleRow key={`schedule-row-${channel.id}`} rowHeight={75} schedules={channel.schedules}></VirtualizedScheduleRow>
            );
        })
        }
    </section>
  );
}

export default Schedules;