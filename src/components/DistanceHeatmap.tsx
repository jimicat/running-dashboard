import { Calendar } from 'lucide-react';
import { RunningActivity } from '../types';
import { getActivityByDate, getAllDaysInYear } from '../utils/dateUtils';
import { HeatmapLegend } from './heatmap/HeatmapLegend';
import { MonthLabels } from './heatmap/MonthLabels';
import { HeatmapGrid } from './heatmap/HeatmapGrid';

interface Props {
  activities: RunningActivity[];
}

export function DistanceHeatmap({ activities }: Props) {
  const currentYear = new Date().getFullYear();
  const activityMap = getActivityByDate(activities);
  const allDays = getAllDaysInYear(currentYear);
  
  const weeks = [];
  let currentWeek: ({ date: string; distance: number; } | null)[] = [];
  
  const firstDayOfYear = new Date(currentYear, 0, 1);
  const firstDayOffset = firstDayOfYear.getDay();
  for (let i = 0; i < firstDayOffset; i++) {
    currentWeek.push(null);
  }
  
  allDays.forEach(day => {
    const dayOfWeek = new Date(day).getDay();
    const distance = activityMap.get(day) || 0;
    
    currentWeek.push({ date: day, distance });
    
    if (dayOfWeek === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });
  
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Running Distance Heatmap
        </h2>
        <HeatmapLegend />
      </div>
      
      <div className="w-full">
        <MonthLabels currentYear={currentYear} />
        <HeatmapGrid weeks={weeks} />
      </div>
    </div>
  );
}