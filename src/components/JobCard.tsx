import type { Job } from "../types";
import { MatchBadge } from "./MatchBadge";
import { SkillChip } from "./SkillChip";

interface JobCardProps {
  job: Job;
  actionLabel?: string;
}

export const JobCard = ({ job, actionLabel = "View Job" }: JobCardProps) => {
  return (
    <article className="rounded-3xl border border-white/50 bg-white p-6 shadow-[0_10px_30px_rgba(30,41,59,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(30,41,59,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
            {job.company}
          </p>
          <h3 className="mt-2 text-xl font-bold text-[#25324b]">{job.title}</h3>
        </div>
        <MatchBadge percent={job.match} />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">{job.description}</p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1">{job.location}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">{job.salaryLabel}</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">{job.experience}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {job.skills.map((skill) => (
          <SkillChip key={skill} label={skill} />
        ))}
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#26a4ff] to-[#7c3aed] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(38,164,255,0.35)] transition hover:opacity-95"
      >
        {actionLabel}
      </button>
    </article>
  );
};
