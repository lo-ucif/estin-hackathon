import type { Job, JobFilters } from "../types";

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
