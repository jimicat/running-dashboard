import React from 'react';
import { Activity } from '../types';
import { 
  Flame, 
  Timer,
  Route,
  Activity as ActivityIcon 
} from 'lucide-react';

interface StatsProps {
  activities: Activity[];
}

export function Stats({ activities }: StatsProps) {
  const totalDistance = activities.reduce((sum, act) => sum + act.distance, 0);
  const totalCalories = activities.reduce((sum, act) => sum + act.calories, 0);
  const totalDuration = activities.reduce((sum, act) => sum + act.elapsed_time, 0);
  
  const stats = [
    {
      id: 'total-activities',
      label: 'Total Activities',
      value: activities.length,
      icon: ActivityIcon,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100'
    },
    {
      id: 'total-distance',
      label: 'Total Distance',
      value: `${totalDistance.toFixed(1)} km`,
      icon: Route,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100'
    },
    {
      id: 'total-duration',
      label: 'Total Duration',
      value: `${Math.round(totalDuration / 60)}h ${totalDuration % 60}m`,
      icon: Timer,
      color: 'text-green-500',
      bgColor: 'bg-green-100'
    },
    {
      id: 'calories-burned',
      label: 'Calories Burned',
      value: `${totalCalories} kcal`,
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className={`${stat.bgColor} p-3 rounded-lg`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-xl font-semibold">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}