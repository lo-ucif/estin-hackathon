import { MainLayout } from '../../components/layout/MainLayout';
import { useWeeks } from '../../hooks/useWeeks';
import { WeekList } from '../../components/WeekList/WeekList';

export const WeeklySequence = () => {
  const { weeks } = useWeeks();

  return (
    <MainLayout>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Weekly Sequence</h2>
      <WeekList weeks={weeks} />
    </MainLayout>
  );
};