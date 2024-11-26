import React from 'react';
import { Activity } from '../types';
import { 
  Timer, 
  Flame, 
  Heart, 
  Route
} from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // const formatDuration = (minutes: number) => {
  //   const hrs = Math.floor(minutes / 60);
  //   const mins = minutes % 60;
  //   return `${hrs}h ${mins}m`;
  // };
  const formatDuration = (timeString: string) => {
    // 使用正则表达式从时间字符串中提取小时、分钟和秒
    const regex = /^(\d{2}):(\d{2}):(\d{2})\.(\d{6})$/;
    const match = timeString.match(regex);
    
    if (!match) {
      throw new Error("Invalid time format");
    }
  
    const hours = parseInt(match[1], 10); // 提取小时部分
    const minutes = parseInt(match[2], 10); // 提取分钟部分
    const sec = parseInt(match[3], 10);
    return `${hours}h ${minutes}m ${sec}s`; // 返回格式化的结果
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {activity.name}
          </h3>
          <p className="text-sm text-gray-500">{formatDate(activity.start_time)}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Route className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Distance</p>
            <p className="font-medium">{activity.distance.toFixed(2)} km</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Timer className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium">{formatDuration(activity.elapsed_time)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Calories</p>
            <p className="font-medium">{activity.calories} kcal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-500">Avg HR</p>
            <p className="font-medium">{activity.avg_hr} bpm</p>
          </div>
        </div>
      </div>
    </div>
  );
}