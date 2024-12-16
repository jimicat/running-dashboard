import { RunningActivity } from '../types';

const API_URL = 'https://stravadb-api.vercel.app/activities';

export async function fetchActivities(): Promise<RunningActivity[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
}