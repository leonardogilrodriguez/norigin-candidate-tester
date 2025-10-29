import { format, addDays, subDays, startOfDay, differenceInMinutes, getHours } from 'date-fns';
import { PIXELS_PER_MINUTE } from './constants';

export const getFiveDayLabels = () => {
  const today = new Date();

  const days = [
    subDays(today, 2),
    subDays(today, 1),
    today,
    addDays(today, 1),
    addDays(today, 2),
  ];

  return days.map(day => ({
    name: format(day, 'EEE'),
    date: format(day, 'dd.MM')
  }));
}

export const getRuntimeMinutes = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return differenceInMinutes(endDate, startDate);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'H:mm');
};

export const totalMinutesFromMidnight = () => {
  const fecha = new Date();
  return differenceInMinutes(fecha, startOfDay(new Date()));
}


export const currentHourScroll = () => {
  // to scroll until current hour we need to calculate minutos from 0:00 to current hour
  // then multiply by pixels per minute
  return getHours(new Date()) * 60 * PIXELS_PER_MINUTE;
}