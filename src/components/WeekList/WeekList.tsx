import { Week } from '../../types/week';
import { WeekCard } from '../WeekCard/WeekCard';

interface WeekListProps {
  weeks: Week[];
}

export const WeekList = ({ weeks }: WeekListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {weeks.map((week) => (
        <WeekCard key={week.id} week={week} />
      ))}
    </div>
  );
};