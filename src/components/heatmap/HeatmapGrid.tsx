import React from 'react';
import { HeatmapCell } from './HeatmapCell';

interface DayData {
  date: string;
  distance: number;
}

interface Props {
  weeks: (DayData | null)[][];
}

export function HeatmapGrid({ weeks }: Props) {
  return (
    <div className="grid grid-flow-col gap-1">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-rows-7 gap-1">
          {week.map((day, dayIndex) => (
            <HeatmapCell
              key={dayIndex}
              date={day?.date || null}
              distance={day?.distance || 0}
            />
          ))}
        </div>
      ))}
    </div>
  );
}