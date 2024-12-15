import React, { useState } from 'react';
import { RunningActivity } from '../types';
import { ChevronRight, ChevronDown, Calendar, Clock, Heart, Flame, Route } from 'lucide-react';
import { formatActivityDate } from '../utils/dateUtils';

interface Props {
  activities: RunningActivity[];
}

export function ActivityList({ activities }: Props) {
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  const toggleActivity = (activityId: string) => {
    setSelectedActivityId(selectedActivityId === activityId ? null : activityId);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Running Activities</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.activity_id} className="border rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleActivity(activity.activity_id)}
            >
              <div className="flex items-center gap-4">
                {selectedActivityId === activity.activity_id ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-800">{activity.name}</h3>
                  <p className="text-sm text-gray-500">{formatActivityDate(activity.start_time)}</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600">{activity.distance.toFixed(2)} km</span>
            </div>
            
            {selectedActivityId === activity.activity_id && (
              <div className="p-4 bg-gray-50 border-t">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <Route className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-500">Distance</p>
                      <p className="font-semibold">{activity.distance.toFixed(2)} km</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold">{activity.moving_time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-500">Calories</p>
                      <p className="font-semibold">{activity.calories} kcal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-500" />
                    <div>
                      <p className="text-sm text-gray-500">Average Heart Rate</p>
                      <p className="font-semibold">{activity.avg_hr} bpm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="text-sm text-gray-500">Max Heart Rate</p>
                      <p className="font-semibold">{activity.max_hr} bpm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-semibold">{formatActivityDate(activity.start_time)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}