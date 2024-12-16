import { useState } from 'react';
import { RunningActivity } from '../../src/types';
import { ActivityCard } from './ActivityCard';
import { ActivityDetails } from './ActivityDetails';
import { List } from 'lucide-react';

interface Props {
  activities: RunningActivity[];
}

export function ActivityList({ activities }: Props) {
  const currentYear = new Date().getFullYear();  // 获取当前年份
  // 过滤出今年的活动并按时间降序排序
  const thisYearActivities = activities
    .filter((act) => new Date(act.start_date_local).getFullYear() === currentYear)
    .sort((a, b) => new Date(b.start_date_local).getTime() - new Date(a.start_date_local).getTime());

  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);

  const toggleActivity = (activityId: number) => {
    setSelectedActivityId(selectedActivityId === activityId ? null : activityId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-1g font-bold mb-6 text-gray-800 flex items-center gap-2">
        <List className="w-6 h-6" />
        活动列表
      </h2>
      <div className="space-y-4">
        {thisYearActivities.map((activity) => (
          <div key={activity.run_id} className="border rounded-lg overflow-hidden">
            <ActivityCard
              activity={activity}
              isSelected={selectedActivityId === activity.run_id}
              onToggle={() => toggleActivity(activity.run_id)}
            />
            {selectedActivityId === activity.run_id && (
              <ActivityDetails activity={activity} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}