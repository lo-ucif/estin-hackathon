import { useMemo, useState } from "react";
import { JobCard } from "../../components/JobCard";
import { SkillChip } from "../../components/SkillChip";
import { allSkills, jobs } from "../../data/jobs";
import type { ExperienceLevel, SalaryRange } from "../../types";
import { defaultFilters, filterJobs, sortJobs } from "../../utils/matcher";

export const JobsPage = () => {
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<ExperienceLevel | "All">("All");
  const [salaryRange, setSalaryRange] = useState<SalaryRange | "All">("All");
  const [sortBy, setSortBy] = useState<"match" | "title">("match");

  const filteredJobs = useMemo(() => {
    const filtered = filterJobs(jobs, {
      ...defaultFilters,
      query: search,
      skills: selectedSkills,
      experience,
      salaryRange,
    });
    return sortJobs(filtered, sortBy);
  }, [search, selectedSkills, experience, salaryRange, sortBy]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill],
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/50 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-[#25324b]">Find Your Next Job</h1>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "match" | "title")}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-[#26a4ff]"
          >
            <option value="match">Sort by Match (highest first)</option>
            <option value="title">Sort by Job Title</option>
          </select>
        </div>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search jobs..."
          className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#26a4ff]"
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-3xl border border-white/50 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
          <h2 className="text-lg font-bold text-[#25324b]">Filters</h2>

          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <button key={skill} type="button" onClick={() => toggleSkill(skill)}>
                  {selectedSkills.includes(skill) ? (
                    <span className="rounded-full bg-[#26a4ff] px-3 py-1 text-xs font-semibold text-white">
                      {skill}
                    </span>
                  ) : (
                    <SkillChip label={skill} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Experience Level
            </p>
            <select
              value={experience}
              onChange={(event) =>
                setExperience(event.target.value as ExperienceLevel | "All")
              }
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              <option value="All">All</option>
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Salary Range
            </p>
            <select
              value={salaryRange}
              onChange={(event) => setSalaryRange(event.target.value as SalaryRange | "All")}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
            >
              <option value="All">All</option>
              <option value="0-120k">$0 - $120k</option>
              <option value="120k-180k">$120k - $180k</option>
              <option value="180k+">$180k+</option>
            </select>
          </div>
        </aside>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} actionLabel="Apply Now" />
          ))}
        </div>
      </section>
    </div>
  );
};
