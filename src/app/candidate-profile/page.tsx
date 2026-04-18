import { Link, useParams } from "react-router-dom";
import { candidates } from "../../data/jobs";
import { getGeneratedProfile, mapGeneratedProfileToCandidate } from "../../utils/profileStore";

const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <section className="rounded-[30px] border border-[rgba(196,198,208,0.4)] bg-[rgba(255,255,255,0.72)] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.06)] backdrop-blur-[10px] md:p-8">
    {children}
  </section>
);

export const CandidateProfilePage = () => {
  const { candidateId } = useParams();
  const generated = getGeneratedProfile();
  const generatedCandidate = generated ? mapGeneratedProfileToCandidate(generated) : null;

  const allCandidates = generatedCandidate ? [generatedCandidate, ...candidates] : candidates;
  const candidate = allCandidates.find((item) => item.id === candidateId) ?? allCandidates[0];

  const contact = candidate.contact;
  const phoneHref = contact.phone ? `tel:${contact.phone}` : undefined;
  const whatsappHref = contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`
    : undefined;

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="rounded-full border border-[#005ac2]/15 bg-[#005ac2]/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#005ac2]">
              AI Suggested Candidate
            </p>
            <h1 className="ai-display mt-3 text-4xl leading-[1.1] text-[#1a1c1e] md:text-6xl">{candidate.name}</h1>
            <p className="mt-2 text-sm text-[#44474e]">
              {candidate.age ? `${candidate.age} years` : "Age not provided"} • {candidate.location}
            </p>
          </div>
          <span className="rounded-full bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-4 py-2 text-sm font-bold text-white">
            {candidate.seniority}
          </span>
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="ai-heading text-2xl font-bold text-[#1a1c1e]">AI Summary</h2>
        <p className="mt-3 text-base leading-8 text-[#44474e]">{candidate.summary}</p>
      </GlassCard>

      <GlassCard>
        <h2 className="ai-heading text-2xl font-bold text-[#1a1c1e]">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {candidate.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#005ac2]/20 bg-[#005ac2]/10 px-3 py-1 text-xs font-semibold text-[#005ac2]"
            >
              {skill}
            </span>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="ai-heading text-2xl font-bold text-[#1a1c1e]">Experience</h2>
        <div className="mt-4 space-y-3">
          {candidate.timeline.map((item) => (
            <article key={`${item.period}-${item.role}`} className="rounded-xl border border-[var(--ai-border)] bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#005ac2]">{item.period}</p>
              <p className="mt-1 text-sm font-bold text-[#1a1c1e]">{item.role}</p>
              <p className="mt-1 text-sm text-[#44474e]">{item.details}</p>
            </article>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="ai-heading text-2xl font-bold text-[#1a1c1e]">Contact</h2>
        {contact.allowDirectContact ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {phoneHref ? (
              <a
                href={phoneHref}
                className="rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-5 py-3 text-sm font-bold text-white"
              >
                📱 Call
              </a>
            ) : null}
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[#005ac2]/25 bg-[#005ac2]/10 px-5 py-3 text-sm font-semibold text-[#005ac2]"
              >
                💬 WhatsApp
              </a>
            ) : null}
            <a
              href={`mailto:${contact.email}`}
              className="rounded-xl border border-[#005ac2]/25 bg-[#005ac2]/10 px-5 py-3 text-sm font-semibold text-[#005ac2]"
            >
              📧 Email
            </a>
            {contact.linkedIn ? (
              <a
                href={contact.linkedIn}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-[#005ac2]/25 bg-[#005ac2]/10 px-5 py-3 text-sm font-semibold text-[#005ac2]"
              >
                🔗 LinkedIn
              </a>
            ) : null}
          </div>
        ) : (
          <p className="mt-3 text-sm text-[#44474e]">
            Privacy mode enabled. This candidate chose to hide direct contact details.
          </p>
        )}
      </GlassCard>

      <GlassCard>
        <h2 className="ai-heading text-2xl font-bold text-[#1a1c1e]">Employer Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className="rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-5 py-3 text-sm font-bold text-white">
            Invite to Interview
          </button>
          <button className="rounded-xl border border-[#6801d1]/25 bg-[#6801d1]/10 px-5 py-3 text-sm font-semibold text-[#6801d1]">
            Save Candidate
          </button>
          <button className="rounded-xl border border-[#005ac2]/25 bg-[#005ac2]/10 px-5 py-3 text-sm font-semibold text-[#005ac2]">
            Mark as Favorite
          </button>
          <Link
            to="/upload"
            className="rounded-xl border border-[var(--ai-border)] bg-white px-5 py-3 text-sm font-semibold text-[#1a1c1e]"
          >
            Back to candidates
          </Link>
        </div>
      </GlassCard>
    </div>
  );
};
