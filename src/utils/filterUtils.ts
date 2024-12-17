import { RunningActivity } from '../types';

export function filterActivitiesByYear(activities: RunningActivity[], year: number): RunningActivity[] {
  return activities.filter(activity => {
    const activityYear = new Date(activity.start_date_local).getFullYear();
    return activityYear === year;
  });
}