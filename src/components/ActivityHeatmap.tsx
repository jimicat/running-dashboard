import React from 'react';
import { Activity } from '../types';
import { Calendar } from 'lucide-react';

interface ActivityHeatmapProps {
  activities: Activity[];
}

export function ActivityHeatmap({ activities }: ActivityHeatmapProps) {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setFullYear(today.getFullYear() - 1);

  // Create array of dates for the last year
  const dates = Array.from({ length: 365 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  // Count activities per day with null check
  const activityCounts = activities.reduce((acc: Record<string, number>, activity) => {
    if (!activity?.start_time) return acc;
    const date = new Date(activity.start_time).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  // Get the maximum activities in a day for scaling
  const maxActivities = Math.max(1, ...Object.values(activityCounts));

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    const intensity = Math.ceil((count / maxActivities) * 4);
    return {
      1: 'bg-green-200',
      2: 'bg-green-300',
      3: 'bg-green-400',
      4: 'bg-green-500'
    }[intensity] || 'bg-green-500';
  };

  // Group dates by week
  const weeks = dates.reduce((acc: string[][], date, i) => {
    const weekIndex = Math.floor(i / 7);
    if (!acc[weekIndex]) acc[weekIndex] = [];
    acc[weekIndex].push(date);
    return acc;
  }, []);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-blue-500" />
        <h3 className="text-lg font-semibold">Activity Heatmap</h3>
      </div>

      <div className="flex text-xs text-gray-400 mb-2">
        {months.map((month) => (
          <div key={month} className="flex-1">
            {month}
          </div>
        ))}
      </div>

      <div className="flex gap-1">
        {weeks.map((week, weekIndex) => (
          <div key={`week-${weekIndex}`} className="flex flex-col gap-1">
            {week.map((date) => (
              <div
                key={`day-${date}`}
                className={`w-3 h-3 rounded-sm ${getIntensityClass(activityCounts[date] || 0)} 
                  transition-colors duration-200 hover:ring-2 hover:ring-blue-300 cursor-pointer`}
                title={`${date}: ${activityCounts[date] || 0} activities`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-gray-100" />
          <div className="w-3 h-3 rounded-sm bg-green-200" />
          <div className="w-3 h-3 rounded-sm bg-green-300" />
          <div className="w-3 h-3 rounded-sm bg-green-400" />
          <div className="w-3 h-3 rounded-sm bg-green-500" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}