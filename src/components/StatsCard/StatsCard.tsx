import { Stats } from '../../types/stats';

interface StatsCardProps {
  stats: Stats;
}

export const StatsCard = ({ stats }: StatsCardProps) => {
  const trendColor = stats.trend === 'up' ? 'text-green-600' : stats.trend === 'down' ? 'text-red-600' : 'text-gray-600';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p className="text-sm text-gray-500 mb-1">{stats.label}</p>
      <p className="text-3xl font-bold text-gray-800">{stats.value}</p>
      {stats.change !== undefined && (
        <p className={`text-sm ${trendColor} mt-2`}>
          {stats.trend === 'up' ? '↑' : stats.trend === 'down' ? '↓' : '→'} {Math.abs(stats.change)}%
        </p>
      )}
    </div>
  );
};