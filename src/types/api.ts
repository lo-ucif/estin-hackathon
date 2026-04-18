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

export interface WorkerJobMatch {
  job_title: string;
  job_company: string;
  job_location: string;
  job_url?: string;
  match_score: number;
  match_tier: string;
  matching_skills: string[];
  rank: number;
  reasoning?: string;
  strengths?: string[];
  gaps?: string[];
  recommendation?: string;
  pre_score?: number;
}

export interface WorkerProfile {
  name: string;
  skills: string[];
  seniority: string;
  profile_summary: string;
}

export interface WorkerResponse {
  success: boolean;
  type?: string;
  total_matches?: number;
  matches?: WorkerJobMatch[];
  worker_profile?: WorkerProfile;
  message?: string;
  summary?: string;
  skills_highlight?: string[];
  recommended_roles?: string[];
  error?: string;
  generated_at?: string;
}

export interface CandidateMatch {
  rank: number;
  candidate_name: string;
  candidate_email?: string;
  skills?: string[];
  experience?: number;
  seniority?: string;
  match_score: number;
  match_tier?: string;
  matching_skills?: string[];
  recommendation: string;
  reasoning: string;
  ai_signal?: string;
}

export interface MatchSummary {
  excellent?: number;
  good?: number;
  fair?: number;
  low?: number;
}

export interface AiRecommendation {
  best_candidate?: CandidateMatch;
  hiring_priority?: string;
}

export interface EmployerResponse {
  success: boolean;
  type?: string;
  total_matches?: number;
  summary?: MatchSummary;
  ai_recommendation?: AiRecommendation;
  matches: CandidateMatch[];
  top_candidates?: CandidateMatch[];
  error?: string;
}

// ============== REQUEST/RESPONSE STATE ==============

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
