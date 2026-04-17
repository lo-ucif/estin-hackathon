import { MainLayout } from '../../components/layout/MainLayout';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { RecentActivity } from '../../components/RecentActivity/RecentActivity';
import { statsData } from '../../data/statsData';
import { activityData } from '../../data/activityData';

export const Dashboard = () => {
  return (
    <MainLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsData.map((stats, index) => (
          <StatsCard key={index} stats={stats} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity activities={activityData} />
      </div>
    </MainLayout>
  );
};