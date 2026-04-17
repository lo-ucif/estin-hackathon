import type { Week } from '../../types/week';

interface WeekCardProps {
  week: Week;
  onClick?: () => void;
}

export const WeekCard = ({ week, onClick }: WeekCardProps) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{week.title}</h3>
        <span className="text-sm text-gray-500">{week.progress}%</span>
      </div>
      <div className="flex gap-2">
        {week.days.map((day, index) => (
          <div
            key={index}
            className={`w-8 h-8 flex items-center justify-center rounded text-sm ${
              day.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {day.day.charAt(0)}
          </div>
        ))}
      </div>
    </div>
  );
};
