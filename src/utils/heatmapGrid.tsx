import { HeatmapCell } from './heatmapCell';

interface DayData {
  date: string;
  distance: number;
}

interface Props {
  weeks: (DayData | null)[][];
}

export function HeatmapGrid({ weeks }: Props) {
  return (
    <div className="grid grid-flow-col auto-cols-fr gap-[2px]">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-rows-7 gap-[2px]">
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