// ============== API PAYLOADS ==============

export interface WorkerPayload {
  type: "worker";
  name: string;
  skills: string[];
  location: string;
  experience_years: number;
  seniority: "junior" | "mid" | "senior";
  cv: string;
  email: string;
  pdfFile?: File;
}

export interface EmployerPayload {
  type: "employer";
  title: string;
  skills_required: string[];
  location: string;
  description: string;
  company: string;
}

// ============== API RESPONSES ==============

export interface WorkerResponse {
  success: boolean;
  message: string;
  summary?: string;
  skills_highlight?: string[];
  recommended_roles?: string[];
  error?: string;
}

export interface CandidateMatch {
  rank: number;
  candidate_name: string;
  match_score: number;
  recommendation: "strong_match" | "good_match" | "moderate_match";
  reasoning: string;
}

export interface EmployerResponse {
  success: boolean;
  type: "employer";
  total_matches: number;
  matches: CandidateMatch[];
  error?: string;
}

// ============== REQUEST/RESPONSE STATE ==============

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
