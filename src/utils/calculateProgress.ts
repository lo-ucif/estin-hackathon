import { Week } from '../types/week';

export const calculateProgress = (weeks: Week[]): number => {
  if (weeks.length === 0) return 0;
  const total = weeks.reduce((acc, week) => acc + week.progress, 0);
  return Math.round(total / weeks.length);
};