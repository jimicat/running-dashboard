// Activity Types
export interface RunningActivity {
  run_id: number;
  name: string;
  type: string;
  subtype: string;
  distance: number;
  moving_time: string;
  elapsed_time: string;
  average_speed: number;
  average_heartrate: number;
  start_date: string;
  start_date_local: string;
  location_country: string;
  summary_polyline: string;
}

// API Response Types
export interface ApiResponse {
  activities: RunningActivity[];
  error?: string;
}

// Component Props Types
export interface ActivityCardProps {
  activity: RunningActivity;
  isSelected: boolean;
  onToggle: () => void;
}

export interface ActivityDetailsProps {
  activity: RunningActivity;
}

export interface ActivityStatsProps {
  activity: RunningActivity;
}

export interface RouteMapProps {
  summaryPolyline: string;
  name: string;
}