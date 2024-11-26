import { Activity } from '../types';

const API_BASE_URL = 'https://written.cc/api';

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const getActivities = () => {
  return useSWR<Activity[]>(`${API_BASE_URL}/activities`, fetcher);
}