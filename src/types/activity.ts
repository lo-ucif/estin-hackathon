export interface Activity {
  id: string;
  title: string;
  timestamp: string;
  type: 'completed' | 'started' | 'milestone';
}