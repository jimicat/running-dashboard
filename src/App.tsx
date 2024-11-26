import React from 'react';
import useSWR from 'swr';
import { Activity } from './types';
import { ActivityCard } from './components/ActivityCard';
import { Stats } from './components/Stats';
import { ActivityHeatmap } from './components/ActivityHeatmap';
import { Activity as ActivityIcon, Loader2 } from 'lucide-react';
import { fetcher } from './services/api';

function App() {
  const { data: activities, error, isLoading } = useSWR<Activity[]>(
    'https://written.cc/api/activities',
    fetcher
  );

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium">Failed to load activities</p>
          <p className="text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const safeActivities = activities || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ActivityIcon className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-900">Fitness Dashboard</h1>
          </div>
          <p className="text-gray-500">Track your fitness journey and achievements</p>
        </header>

        <section className="mb-8">
          <Stats activities={safeActivities} />
        </section>

        <section className="mb-8">
          <ActivityHeatmap activities={safeActivities} />
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {safeActivities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;