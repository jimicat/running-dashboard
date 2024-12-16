import { format, parseISO } from 'date-fns';

export function formatDistance(distance: number): string {
  return (distance / 1000).toFixed(2);
}

export function formatSpeed(speed: number): string {
  const paceInMinutesPerKm = 16.6667 / speed;
  const minutes = Math.floor(paceInMinutesPerKm);
  const seconds = Math.round((paceInMinutesPerKm - minutes) * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}/km`;
}

export function formatDate(dateString: string): string {
  return format(parseISO(dateString), 'yyyy-MM-dd HH:mm:ss');
}

export function formatDuration(timeString: string): string {
  const date = new Date(timeString);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}