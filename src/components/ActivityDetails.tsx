import { ActivityDetailsProps } from '../types';
import { ActivityStats } from './ActivityStats';

export function ActivityDetails({ activity }: ActivityDetailsProps) {
  return (
    <div className="p-4 bg-gray-50 border-t space-y-6">
      <ActivityStats activity={activity} />
    </div>
  );
}