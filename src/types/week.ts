export interface Week {
  id: string;
  title: string;
  progress: number;
  days: {
    day: string;
    completed: boolean;
  }[];
}