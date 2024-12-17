import { format } from 'date-fns';
import { getIntensityColor } from '../utils/dateUtils';

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
      title={`${format(new Date(date), 'yyyy-MM-dd')}: ${(distance / 1000).toFixed(2)}km`}
    >
    </div>
  );
}