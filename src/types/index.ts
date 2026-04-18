export type ExperienceLevel = "Junior" | "Mid" | "Senior";

export type SalaryRange = "0-120k" | "120k-180k" | "180k+";
export type WorkType = "Remote" | "Onsite" | "Hybrid" | "Local";

export interface ContactInfo {
  phone: string;
  whatsapp?: string;
  email: string;
  linkedIn?: string;
  allowDirectContact: boolean;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  workType: WorkType;
  experience: ExperienceLevel;
  salaryRange: SalaryRange;
  salaryLabel: string;
  match: number;
  skills: string[];
  description: string;
  employerContact: {
    email: string;
    whatsapp?: string;
  };
}

export interface Candidate {
  id: string;
  name: string;
  age?: number;
  title: string;
  experience: ExperienceLevel;
  seniority: ExperienceLevel;
  summary: string;
  skills: string[];
  location: string;
  timeline: Array<{
    period: string;
    role: string;
    details: string;
  }>;
  contact: ContactInfo;
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

export interface CandidateGeneratedProfile {
  id: "generated-profile";
  name: string;
  age: string;
  location: string;
  workType: WorkType;
  seniority: ExperienceLevel;
  skills: string[];
  experienceText: string;
  education: string;
  projects: string;
  summary: string;
  contact: ContactInfo;
}
