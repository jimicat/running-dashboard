import { Clock, Heart, Route } from 'lucide-react';
import { ActivityStatsProps } from '../types';
import { formatDistance, formatSpeed, formatDuration } from '../utils/formatters';

export function ActivityStats({ activity }: ActivityStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className="flex items-center gap-3">
        <Route className="w-5 h-5 text-blue-500" />
        <div>
          <p className="text-sm text-gray-500">Distance</p>
          <p className="font-semibold">{formatDistance(activity.distance)} km</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-green-500" />
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-semibold">{formatDuration(activity.moving_time)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Heart className="w-5 h-5 text-red-500" />
        <div>
          <p className="text-sm text-gray-500">Average Heart Rate</p>
          <p className="font-semibold">{Math.round(activity.average_heartrate)} bpm</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Route className="w-5 h-5 text-purple-500" />
        <div>
          <p className="text-sm text-gray-500">Average Pace</p>
          <p className="font-semibold">{formatSpeed(activity.average_speed)}</p>
        </div>
      </div>
    </div>
  );
}