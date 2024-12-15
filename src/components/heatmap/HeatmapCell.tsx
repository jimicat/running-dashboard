import React from 'react';
import { format } from 'date-fns';
import { getIntensityColor } from '../../utils/dateUtils';

interface Props {
  date: string | null;
  distance: number;
}

export function HeatmapCell({ date, distance }: Props) {
  if (!date) {
    return <div className="w-3 h-3" />;
  }

  return (
    <div
      className={`w-3 h-3 rounded-sm cursor-pointer transition-colors duration-200 ${getIntensityColor(distance)}`}
      title={`${format(new Date(date), 'MMM d, yyyy')}: ${distance.toFixed(2)}km`}
    >
      <div className="group relative">
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
          {format(new Date(date), 'MMM d')}: {distance.toFixed(2)}km
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-3 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}