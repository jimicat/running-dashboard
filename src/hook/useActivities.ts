import { useState, useEffect } from 'react';
import { RunningActivity } from '../types';

export function useActivities() {
  const [activities, setActivities] = useState<RunningActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://stravadb-api.vercel.app/activities')
      .then(response => response.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load activities');
        setLoading(false);
      });
  }, []);

  return { activities, loading, error };
}