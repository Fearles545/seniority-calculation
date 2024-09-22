import { Duration } from 'date-fns';

export const sumDurations = (durations: Duration[]): Duration => {
  return durations.reduce((acc, duration) => {
    acc.years = (acc.years || 0) + (duration.years || 0);
    acc.months = (acc.months || 0) + (duration.months || 0);
    acc.days = (acc.days || 0) + (duration.days || 0);
    acc.hours = (acc.hours || 0) + (duration.hours || 0);
    acc.minutes = (acc.minutes || 0) + (duration.minutes || 0);
    acc.seconds = (acc.seconds || 0) + (duration.seconds || 0);
    return acc;
  }, {} as Duration);
};
