export interface Stats {
  label: string;
  value: number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
}