import { Activity } from '../../types/activity';

interface RecentActivityProps {
  activities: Activity[];
}

export const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      <ul className="space-y-3">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3">
            <span className={`w-2 h-2 mt-2 rounded-full ${
              activity.type === 'completed' ? 'bg-green-500' :
              activity.type === 'started' ? 'bg-blue-500' : 'bg-yellow-500'
            }`} />
            <div>
              <p className="text-gray-700">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.timestamp}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};