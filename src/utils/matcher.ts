import type { Candidate, Job, JobFilters } from "../types";

export const defaultFilters: JobFilters = {
  query: "",
  skills: [],
  experience: "All",
  salaryRange: "All",
};

export const filterJobs = (allJobs: Job[], filters: JobFilters): Job[] => {
  const query = filters.query.trim().toLowerCase();

  return allJobs.filter((job) => {
    const matchesQuery =
      query.length === 0 ||
      [job.title, job.company, job.location, ...job.skills]
        .join(" ")
        .toLowerCase()
        .includes(query);

    const matchesSkills =
      filters.skills.length === 0 ||
      filters.skills.every((skill) => job.skills.includes(skill));

    const matchesExperience =
      filters.experience === "All" || job.experience === filters.experience;

    const matchesSalary =
      filters.salaryRange === "All" || job.salaryRange === filters.salaryRange;

    return matchesQuery && matchesSkills && matchesExperience && matchesSalary;
  });
};

export const sortJobs = (items: Job[], sortBy: "match" | "title"): Job[] => {
  const sorted = [...items];
  if (sortBy === "match") {
    return sorted.sort((a, b) => b.match - a.match || a.title.localeCompare(b.title));
  }
  return sorted.sort((a, b) => a.title.localeCompare(b.title));
};

export interface JobMatchResult {
  job: Job;
  match: number;
  matchedSkills: string[];
}

export interface CandidateMatchResult {
  candidate: Candidate;
  match: number;
  matchedSkills: string[];
}

export const matchJobsForProfile = (
  profileSkills: string[],
  allJobs: Job[],
  seniority: "Junior" | "Mid" | "Senior",
): JobMatchResult[] => {
  const normalizedSkills = profileSkills.map((skill) => skill.toLowerCase().trim());

  return allJobs
    .map((job) => {
      const matchedSkills = job.skills.filter((skill) =>
        normalizedSkills.includes(skill.toLowerCase()),
      );

      const overlapScore = job.skills.length
        ? Math.round((matchedSkills.length / job.skills.length) * 70)
        : 0;
      const baseline = 25;
      const seniorityBonus = job.experience === seniority ? 8 : 0;
      const match = Math.min(99, baseline + overlapScore + seniorityBonus);

      return {
        job,
        match: Math.max(match, 40),
        matchedSkills,
      };
    })
    .sort((a, b) => b.match - a.match || a.job.title.localeCompare(b.job.title));
};

export const matchCandidatesForJob = (
  requiredSkills: string[],
  allCandidates: Candidate[],
  experienceLevel: "Junior" | "Mid" | "Senior",
): CandidateMatchResult[] => {
  const normalizedSkills = requiredSkills.map((skill) => skill.toLowerCase().trim());

  return allCandidates
    .map((candidate) => {
      const matchedSkills = candidate.skills.filter((skill) =>
        normalizedSkills.includes(skill.toLowerCase()),
      );

      const overlapScore = normalizedSkills.length
        ? Math.round((matchedSkills.length / normalizedSkills.length) * 70)
        : 0;
      const baseline = 28;
      const experienceBonus = candidate.experience === experienceLevel ? 10 : 0;
      const match = Math.min(99, baseline + overlapScore + experienceBonus);

      return {
        candidate,
        match: Math.max(match, 38),
        matchedSkills,
      };
    })
    .sort((a, b) => b.match - a.match || a.candidate.name.localeCompare(b.candidate.name));
};
