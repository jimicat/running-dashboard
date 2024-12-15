import React, { useEffect, useState } from 'react';
import { RunningActivity } from './types';
import { AnnualSummary } from './components/AnnualSummary';
import { ActivityList } from './components/ActivityList';
import { DistanceHeatmap } from './components/DistanceHeatmap';

function App() {
  const [activities, setActivities] = useState<RunningActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://python-activities-api.vercel.app/api/activities')
      .then(response => response.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load activities');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading activities...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Running Dashboard</h1>
        <AnnualSummary activities={activities} />
        <DistanceHeatmap activities={activities} />
        <ActivityList activities={activities} />
      </div>
    </div>
  );
}

export default App;