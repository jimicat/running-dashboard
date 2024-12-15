import React from 'react';

export function HeatmapLegend() {
  const intensities = [
    { label: 'No activity', color: 'bg-gray-100' },
    { label: '< 3km', color: 'bg-green-200' },
    { label: '3-5km', color: 'bg-green-300' },
    { label: '5-8km', color: 'bg-green-400' },
    { label: '8km+', color: 'bg-green-500' },
  ];

  return (
    <div className="flex items-center gap-4 text-sm text-gray-600">
      {intensities.map(({ label, color }) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`w-4 h-4 ${color} rounded`}></div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}