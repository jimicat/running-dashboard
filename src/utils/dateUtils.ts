import { parseISO, format, startOfYear, eachDayOfInterval, endOfYear } from 'date-fns';
import { RunningActivity } from '../types';

export const getActivityByDate = (activities: RunningActivity[]) => {
  const activityMap = new Map<string, number>();
  
  activities.forEach(activity => {
    const date = activity.start_date.split('T')[0]; // Get YYYY-MM-DD from ISO date
    const currentDistance = activityMap.get(date) || 0;
    activityMap.set(date, currentDistance + activity.distance);
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
  // Convert from meters to kilometers for the comparison
  const distanceInKm = distance / 1000;
  
  if (distanceInKm === 0) return 'bg-gray-100';
  if (distanceInKm < 3) return 'bg-green-200';
  if (distanceInKm < 5) return 'bg-green-300';
  if (distanceInKm < 8) return 'bg-green-400';
  return 'bg-green-500';
};

export const formatActivityDate = (dateString: string): string => {
  const date = parseISO(dateString);
  return format(date, 'yyyy-MM-dd HH:mm:ss');
};