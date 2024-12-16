import { ChevronRight, ChevronDown } from 'lucide-react';
import { ActivityCardProps } from '../../src/types';
import { formatDistance, formatDate } from '../utils/formatters';

export function ActivityCard({ activity, isSelected, onToggle }: ActivityCardProps) {
  return (
    <div
      className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
      onClick={onToggle}
    >
      <div className="flex items-center gap-4">
        {isSelected ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
        <div>
          <h3 className="font-semibold text-gray-800">{activity.name}</h3>
          <p className="text-sm text-gray-500">{formatDate(activity.start_date_local)}</p>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-600">
        {formatDistance(activity.distance)} km
      </span>
    </div>
  );
}