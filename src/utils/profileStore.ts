import type { Candidate, CandidateGeneratedProfile } from "../types";

const GENERATED_PROFILE_KEY = "ai_job_generated_profile";

export const saveGeneratedProfile = (profile: CandidateGeneratedProfile) => {
  localStorage.setItem(GENERATED_PROFILE_KEY, JSON.stringify(profile));
};

export const getGeneratedProfile = (): CandidateGeneratedProfile | null => {
  try {
    const raw = localStorage.getItem(GENERATED_PROFILE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CandidateGeneratedProfile;
  } catch {
    return null;
  }
};

export const mapGeneratedProfileToCandidate = (
  profile: CandidateGeneratedProfile,
): Candidate => {
  const timeline = [
    {
      period: "Recent Experience",
      role: "Professional Background",
      details: profile.experienceText || "Candidate has practical project experience.",
    },
    {
      period: "Projects",
      role: "Delivered Work",
      details: profile.projects || "Project portfolio not provided.",
    },
  ];

  return {
    id: profile.id,
    name: profile.name || "Generated Candidate",
    age: Number(profile.age) || undefined,
    title: `${profile.seniority} Developer`,
    experience: profile.seniority,
    seniority: profile.seniority,
    summary: profile.summary,
    skills: profile.skills,
    location: profile.location || "Unknown",
    timeline,
    contact: profile.contact,
  };
};
