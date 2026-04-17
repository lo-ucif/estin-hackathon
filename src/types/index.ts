export type ExperienceLevel = "Junior" | "Mid" | "Senior";

export type SalaryRange = "0-120k" | "120k-180k" | "180k+";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: ExperienceLevel;
  salaryRange: SalaryRange;
  salaryLabel: string;
  match: number;
  skills: string[];
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  title: string;
  experience: ExperienceLevel;
  skills: string[];
  location: string;
}

export interface JobFilters {
  query: string;
  skills: string[];
  experience: ExperienceLevel | "All";
  salaryRange: SalaryRange | "All";
}

export interface CvAnalysisResult {
  processing: boolean;
  progress: number;
  extractedSkills: string[];
}
