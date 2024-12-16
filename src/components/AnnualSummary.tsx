import { RunningActivity } from '../types';
import { Activity, Timer, Heart, Flame, Route } from 'lucide-react';

interface Props {
  activities: RunningActivity[];
}

export function AnnualSummary({ activities }: Props) {
  const totalDistance = activities.reduce((sum, act) => sum + act.distance, 0);
  const totalCalories = activities.reduce((sum, act) => sum + act.calories, 0);
  const avgHeartRate = activities.reduce((sum, act) => sum + act.avg_hr, 0) / activities.length;
  const totalActivities = activities.length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Activity className="w-4 h-4" />
        Annual Running Summary
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Timer className="w-4 h-4" />
            <h3 className="font-semibold">Activities</h3>
          </div>
          <p className="text-2xl font-bold text-blue-700">{totalActivities}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-600 mb-2">
            <Route className="w-4 h-4" />
            <h3 className="font-semibold">Total Distance</h3>
          </div>
          <p className="text-2xl font-bold text-green-700">{totalDistance.toFixed(2)} km</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-red-600 mb-2">
            <Heart className="w-4 h-4" />
            <h3 className="font-semibold">Avg Heart Rate</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">{avgHeartRate.toFixed(0)} bpm</p>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-orange-600 mb-2">
            <Flame className="w-4 h-4" />
            <h3 className="font-semibold">Total Calories</h3>
          </div>
          <p className="text-2xl font-bold text-orange-700">{totalCalories.toFixed(0)} kcal</p>
        </div>
      </div>
    </div>
  );
}