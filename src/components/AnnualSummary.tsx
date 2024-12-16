import { RunningActivity } from '../types';
import { Activity, Timer, Route } from 'lucide-react';

interface Props {
  activities: RunningActivity[];
}

export function AnnualSummary({ activities }: Props) {
  const currentYear = new Date().getFullYear();
  const thisYearActivities = activities.filter(act => new Date(act.start_date_local).getFullYear() === currentYear);
  const totalDistance = thisYearActivities.reduce((sum, act) => sum + act.distance / 1000, 0);
  const totalActivities = thisYearActivities.length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-1g font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Activity className="w-6 h-6" />
        数据总览
      </h2>
      {/* 显示 2 卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Timer className="w-5 h-5" />
            <h3 className="font-semibold">活动</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">{totalActivities}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Route className="w-5 h-5" />
            <h3 className="font-semibold">总距离</h3>
          </div>
          <p className="text-2xl font-bold text-green-700">{totalDistance.toFixed(2)} KM</p>
        </div>
      </div>
    </div>
  );
}