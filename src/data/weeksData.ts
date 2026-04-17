import { Week } from '../types/week';

export const weeksData: Week[] = [
  {
    id: '1',
    title: 'Week 1 - Basics',
    progress: 75,
    days: [
      { day: 'Mon', completed: true },
      { day: 'Tue', completed: true },
      { day: 'Wed', completed: true },
      { day: 'Thu', completed: false },
      { day: 'Fri', completed: false },
    ],
  },
  {
    id: '2',
    title: 'Week 2 - Fundamentals',
    progress: 100,
    days: [
      { day: 'Mon', completed: true },
      { day: 'Tue', completed: true },
      { day: 'Wed', completed: true },
      { day: 'Thu', completed: true },
      { day: 'Fri', completed: true },
    ],
  },
  {
    id: '3',
    title: 'Week 3 - Advanced',
    progress: 40,
    days: [
      { day: 'Mon', completed: true },
      { day: 'Tue', completed: false },
      { day: 'Wed', completed: false },
      { day: 'Thu', completed: false },
      { day: 'Fri', completed: false },
    ],
  },
];