import { Link, useParams } from "react-router-dom";
import { MatchBadge } from "../../components/MatchBadge";
import { SkillChip } from "../../components/SkillChip";
import { jobs } from "../../data/jobs";

const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <section className="rounded-[30px] border border-[rgba(196,198,208,0.4)] bg-[rgba(255,255,255,0.72)] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.06)] backdrop-blur-[10px] md:p-8">
    {children}
  </section>
);

export const JobDetailsPage = () => {
  const { jobId } = useParams();
  const job = jobs.find((item) => item.id === jobId) ?? jobs[0];

  const whatsappHref = job.employerContact.whatsapp
    ? `https://wa.me/${job.employerContact.whatsapp.replace(/\D/g, "")}`
    : undefined;

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <MatchBadge percent={job.match} />
            <h1 className="ai-display mt-3 text-4xl leading-[1.1] text-[#1a1c1e] md:text-6xl">
              {job.title}
            </h1>
            <p className="mt-2 text-lg text-[#44474e]">{job.company}</p>
            <p className="mt-1 text-sm text-[#44474e]">
              {job.location} • {job.workType}
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="ai-heading text-2xl font-bold text-[#1a1c1e]">
          Job Description
        </h2>
        <p className="mt-3 text-base leading-8 text-[#44474e]">
          {job.description} This AI-generated opportunity summary highlights the
          impact, expectations, and team fit signals to help candidates evaluate
          roles faster with better confidence.
        </p>
      </GlassCard>

      <GlassCard>
        <h2 className="ai-heading text-2xl font-bold text-[#1a1c1e]">
          Required Skills
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <SkillChip key={skill} label={skill} />
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="ai-heading text-2xl font-bold text-[#1a1c1e]">
          Salary + Conditions
        </h2>
        <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-xl border border-[var(--ai-border)] bg-white p-4">
            <p className="text-[#44474e]/70">Salary</p>
            <p className="mt-1 font-semibold text-[#1a1c1e]">
              {job.salaryLabel}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--ai-border)] bg-white p-4">
            <p className="text-[#44474e]/70">Experience</p>
            <p className="mt-1 font-semibold text-[#1a1c1e]">
              {job.experience}
            </p>
          </div>
          <div className="rounded-xl border border-[var(--ai-border)] bg-white p-4">
            <p className="text-[#44474e]/70">Work Type</p>
            <p className="mt-1 font-semibold text-[#1a1c1e]">{job.workType}</p>
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="ai-heading text-2xl font-bold text-[#1a1c1e]">
          Apply / Contact
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(0,90,194,0.35)]"
          >
            Apply Now
          </button>
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[#005ac2]/25 bg-[#005ac2]/10 px-6 py-3 text-sm font-semibold text-[#005ac2]"
            >
              Contact Employer (WhatsApp)
            </a>
          ) : null}
          <a
            href={`mailto:${job.employerContact.email}`}
            className="rounded-xl border border-[#005ac2]/25 bg-[#005ac2]/10 px-6 py-3 text-sm font-semibold text-[#005ac2]"
          >
            Contact Employer (Email)
          </a>
          <Link
            to="/jobs"
            className="rounded-xl border border-[var(--ai-border)] bg-white px-6 py-3 text-sm font-semibold text-[#1a1c1e]"
          >
            Back to matches
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};
