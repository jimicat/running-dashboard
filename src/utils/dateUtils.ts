import { parseISO, format, startOfYear, eachDayOfInterval, endOfYear } from 'date-fns';
import { RunningActivity } from '../types';

export const getActivityByDate = (activities: RunningActivity[]) => {
  const activityMap = new Map<string, number>();
  
  activities.forEach(activity => {
    const date = activity.start_time.split(' ')[0]; // Get YYYY-MM-DD
    activityMap.set(date, (activityMap.get(date) || 0) + activity.distance);
  });
  
  return activityMap;
};

export const getAllDaysInYear = (year: number) => {
  const start = startOfYear(new Date(year, 0));
  const end = endOfYear(new Date(year, 0));
  
  return eachDayOfInterval({ start, end }).map(date => 
    format(date, 'yyyy-MM-dd')
  );
};

export const getIntensityColor = (distance: number) => {
  if (distance === 0) return 'bg-gray-100';
  if (distance < 3) return 'bg-green-200';
  if (distance < 5) return 'bg-green-300';
  if (distance < 8) return 'bg-green-400';
  return 'bg-green-500';
};

export const formatActivityDate = (dateString: string) => {
  const date = new Date(dateString);
  return format(date, 'MMM d, yyyy h:mm a');
};