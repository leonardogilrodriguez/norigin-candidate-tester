import { differenceInMinutes, startOfDay, subDays } from 'date-fns';
import { EPG_ENDPOINT } from './constants';
import { formatDate } from '../utils/dates';
import { PIXELS_PER_MINUTE } from '../utils/constants';

export const fetchEPGData = async() => {
  try {
    if (!EPG_ENDPOINT) {
      throw new Error('EPG_ENDPOINT is not defined');
    }

    const response = await fetch(EPG_ENDPOINT)
    if (!response.ok) {
      throw new Error(`Unable to connect to ${EPG_ENDPOINT}`);
    }
    const rawData = await response.json();

    const channels = rawData?.channels?.map((channel: Channel) => {
      const schedules = channel?.schedules?.map((schedule: Schedule) => {
        const { start, end } = schedule;
        const runtime = differenceInMinutes(end, start);
        const scheduleWidth = (runtime * PIXELS_PER_MINUTE);

        let startMinutes = 0; 
        const differenceStartMinutes = differenceInMinutes(start, startOfDay(new Date()));
        if (differenceStartMinutes >= 0) {
          startMinutes = differenceStartMinutes;
        }
        else {
          startMinutes = differenceInMinutes(start, startOfDay(subDays(new Date(), 1)));
        }
        
        let endMinutes = 0; 
        const differenceEndMinutes = differenceInMinutes(end, startOfDay(new Date()));
        if (differenceEndMinutes >= 0) {
          endMinutes = differenceEndMinutes;
        }
        else {
          endMinutes = differenceInMinutes(end, startOfDay(subDays(new Date(), 1)));
        }

        const startStr = formatDate(start);
        const endStr = formatDate(end);
        const timeLiteral = `${startStr} - ${endStr}`
        return { ...schedule, scheduleWidth, runtime, startMinutes, endMinutes, timeLiteral };
      });
      return { ...channel, schedules };
    });

    return { channels };
  }
  catch (exception) {
    throw new Error(`Unable to connect to ${EPG_ENDPOINT}`);
  }
}