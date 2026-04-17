import type { Stats } from '../../types/stats';

interface StatsCardProps {
  stats: Stats;
}

export const StatsCard = ({ stats }: StatsCardProps) => {
  const trendColor =
    stats.trend === 'up'
      ? 'text-green-600'
      : stats.trend === 'down'
        ? 'text-red-600'
        : 'text-gray-600';

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <p className="mb-1 text-sm text-gray-500">{stats.label}</p>
      <p className="text-3xl font-bold text-gray-800">{stats.value}</p>
      {stats.change !== undefined && (
        <p className={`mt-2 text-sm ${trendColor}`}>
          {stats.trend === 'up' ? '+' : stats.trend === 'down' ? '-' : '='} {Math.abs(stats.change)}%
        </p>
      )}
    </div>
  );
};
