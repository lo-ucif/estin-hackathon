import { MatchBadge } from "./MatchBadge";
import { SkillChip } from "./SkillChip";

interface JobCardProps {
  title: string;
  match: number;
  matchedSkills: string[];
  description?: string;
  actionLabel?: string;
}

export const JobCard = ({
  title,
  match,
  matchedSkills,
  description,
  actionLabel = "View Job",
}: JobCardProps) => {
  return (
    <article className="rounded-3xl border border-white/50 bg-white p-6 shadow-[0_10px_30px_rgba(30,41,59,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(30,41,59,0.12)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#44474e]/70">AI Match</p>
          <h3 className="mt-2 text-xl font-bold text-[#1a1c1e]">{title}</h3>
        </div>
        <MatchBadge percent={match} />
      </div>

      {description ? <p className="mt-4 text-sm leading-6 text-[#44474e]">{description}</p> : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {matchedSkills.map((skill) => (
          <SkillChip key={skill} label={skill} />
        ))}
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,90,194,0.35)] transition hover:opacity-95"
      >
        {actionLabel}
      </button>
    </article>
  );
};
