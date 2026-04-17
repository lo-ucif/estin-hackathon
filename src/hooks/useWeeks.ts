import { useState } from 'react';
import type { Week } from '../types/week';
import { weeksData } from '../data/weeksData';

export const useWeeks = () => {
  const [weeks] = useState<Week[]>(weeksData);

  const getWeekById = (id: string): Week | undefined => {
    return weeks.find((week) => week.id === id);
  };

  return { weeks, getWeekById };
};
