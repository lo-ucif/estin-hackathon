import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MatchBadge } from "../../components/MatchBadge";
import { SkillChip } from "../../components/SkillChip";
import { candidates } from "../../data/jobs";
import type { ExperienceLevel, WorkType } from "../../types";
import { matchCandidatesForJob } from "../../utils/matcher";
import {
  getGeneratedProfile,
  mapGeneratedProfileToCandidate,
} from "../../utils/profileStore";

const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <section className="rounded-[30px] border border-[rgba(196,198,208,0.4)] bg-[rgba(255,255,255,0.72)] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.06)] backdrop-blur-[10px] md:p-8">
    {children}
  </section>
);

export const UploadPage = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("Junior");
  const [salaryRange, setSalaryRange] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState<WorkType>("Remote");
  const [skills, setSkills] = useState<string[]>(["React", "Node.js"]);
  const [skillInput, setSkillInput] = useState("");
  const [pdfName, setPdfName] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value || skills.includes(value)) return;
    setSkills((current) => [...current, value]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((current) => current.filter((item) => item !== skill));
  };

  const startProcessing = () => {
    setLoading(true);
    setCompleted(false);
    setProgress(0);
    const interval = window.setInterval(() => {
      setProgress((current) => {
        const next = current + 2;
        if (next >= 100) {
          window.clearInterval(interval);
          setLoading(false);
          setCompleted(true);
          return 100;
        }
        return next;
      });
    }, 100);
  };

  const summary = useMemo(() => {
    const safeTitle = jobTitle || "Software Engineer";
    const required = skills.slice(0, 5).join(", ") || "core engineering skills";
    return `${safeTitle} role in ${location || "your target market"} (${workType}) for ${experienceLevel} level talent. Salary range: ${salaryRange || "competitive package"}. Required capabilities include ${required}.`;
  }, [jobTitle, location, workType, experienceLevel, salaryRange, skills]);

  const sourceCandidates = useMemo(() => {
    const generated = getGeneratedProfile();
    if (!generated) return candidates;
    return [mapGeneratedProfileToCandidate(generated), ...candidates];
  }, [completed]);

  const matchedCandidates = useMemo(
    () =>
      matchCandidatesForJob(skills, sourceCandidates, experienceLevel).slice(
        0,
        4,
      ),
    [skills, sourceCandidates, experienceLevel],
  );

  const inputClass =
    "rounded-xl border border-[var(--ai-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#005ac2]";

  return (
    <div className="space-y-6">
      <GlassCard>
        <p className="inline-flex rounded-xl border border-[var(--ai-border)] bg-white px-4 py-1.5 text-xs font-medium text-[#005ac2]">
          Ready to get started
        </p>
        <h1 className="ai-display mt-4 text-4xl leading-[1.1] text-[#1a1c1e] md:text-6xl">
          Post a Job
        </h1>
        <p className="mt-2 text-sm text-[#44474e] md:text-base">
          Create a job profile and let AI find matching candidates.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job Title"
            className={inputClass}
          />
          <input
            value={salaryRange}
            onChange={(e) => setSalaryRange(e.target.value)}
            placeholder="Salary Range"
            className={inputClass}
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className={inputClass}
          />
          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value as WorkType)}
            className={inputClass}
          >
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Local">Local</option>
          </select>
        </div>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Job Description"
          className={`mt-4 min-h-[120px] w-full ${inputClass}`}
        />

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold text-[#1a1c1e]">
              Required Skills
            </p>
            <div className="flex gap-2">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="Add required skill"
                className="w-full rounded-xl border border-[var(--ai-border)] bg-[#f8f8fd] px-3 py-2 text-sm outline-none focus:border-[#005ac2]"
              />
              <button
                type="button"
                onClick={addSkill}
                className="rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-4 py-2 text-sm font-semibold text-white"
              >
                Add
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <button
                  type="button"
                  key={skill}
                  onClick={() => removeSkill(skill)}
                  className="rounded-full border border-[#005ac2]/20 bg-[#005ac2]/10 px-3 py-1 text-xs font-semibold text-[#005ac2]"
                >
                  {skill} x
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-[#1a1c1e]">
              Experience Level
            </p>
            <select
              value={experienceLevel}
              onChange={(e) =>
                setExperienceLevel(e.target.value as ExperienceLevel)
              }
              className={`w-full ${inputClass}`}
            >
              <option value="Junior">Junior</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-dashed border-[#005ac2]/35 bg-[#005ac2]/5 p-4">
          <label className="cursor-pointer text-sm font-semibold text-[#005ac2]">
            Upload PDF (optional)
            <input
              type="file"
              accept=".pdf"
              className="mt-2 block text-xs text-[#44474e]"
              onChange={(e) => setPdfName(e.target.files?.[0]?.name ?? "")}
            />
          </label>
          {pdfName ? (
            <p className="mt-2 text-xs text-[#44474e]">Selected: {pdfName}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={startProcessing}
          disabled={loading}
          className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(0,90,194,0.35)] disabled:opacity-70"
        >
          Generate Job Profile
        </button>
      </GlassCard>

      {(loading || completed) && (
        <GlassCard>
          <h2 className="ai-heading text-xl font-bold text-[#1a1c1e]">
            Processing Job...
          </h2>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#005ac2] to-[#6801d1] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-[#44474e]">{progress}% complete</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#005ac2]">
            AI ranking best-fit candidates...
          </p>
        </GlassCard>
      )}

      {completed && (
        <>
          <GlassCard>
            <h2 className="ai-heading text-xl font-bold text-[#1a1c1e]">
              Generated Job Profile Summary
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#44474e]">{summary}</p>
            <p className="mt-3 text-xs text-[#44474e]/70">
              Description: {jobDescription || "No description provided"}
            </p>
          </GlassCard>

          <GlassCard>
            <h2 className="ai-heading text-xl font-bold text-[#1a1c1e]">
              Matching Candidates
            </h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {matchedCandidates.map((result) => (
                <article
                  key={result.candidate.id}
                  className="rounded-3xl border border-white/50 bg-white p-5 shadow-[0_10px_30px_rgba(30,41,59,0.08)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <MatchBadge percent={result.match} analyzing={loading} />
                      <h3 className="mt-2 text-lg font-bold text-[#1a1c1e]">
                        {result.candidate.name}
                      </h3>
                      <p className="text-sm text-[#44474e]">
                        {result.candidate.title}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {(result.matchedSkills.length > 0
                      ? result.matchedSkills
                      : result.candidate.skills.slice(0, 3)
                    ).map((skill) => (
                      <SkillChip key={skill} label={skill} />
                    ))}
                  </div>

                  <Link
                    to={`/candidates/${result.candidate.id}`}
                    className="mt-5 block w-full rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,90,194,0.35)]"
                  >
                    View Profile
                  </Link>
                </article>
              ))}
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
};
