import { useMemo, useState } from "react";
import { JobCard } from "../../components/JobCard";
import { jobs } from "../../data/jobs";
import { matchJobsForProfile } from "../../utils/matcher";

type Seniority = "Junior" | "Mid" | "Senior";

const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <section className="rounded-[30px] border border-[rgba(196,198,208,0.4)] bg-[rgba(255,255,255,0.72)] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.06)] backdrop-blur-[10px] md:p-8">
    {children}
  </section>
);

export const JobsPage = () => {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [workType, setWorkType] = useState<"Local" | "Remote">("Remote");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");
  const [projects, setProjects] = useState("");
  const [seniority, setSeniority] = useState<Seniority>("Junior");
  const [cvFileName, setCvFileName] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);
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

  const startGeneration = () => {
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

  const profileSummary = useMemo(() => {
    const safeName = fullName || "Candidate";
    const primarySkills = skills.slice(0, 4).join(", ") || "General tech skills";
    return `${safeName} is a ${seniority.toLowerCase()} candidate in ${location || "their region"}, interested in ${workType.toLowerCase()} roles. Core strengths include ${primarySkills}. Experience highlights: ${experience || "practical project delivery and teamwork"}.`;
  }, [fullName, seniority, location, workType, skills, experience]);

  const matchedJobs = useMemo(
    () => matchJobsForProfile(skills, jobs, seniority).slice(0, 3),
    [skills, seniority],
  );

  const inputClass =
    "rounded-xl border border-[var(--ai-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#005ac2]";

  return (
    <div className="space-y-6">
      <GlassCard>
        <p className="inline-flex rounded-xl border border-[var(--ai-border)] bg-white px-4 py-1.5 text-xs font-medium text-[#005ac2]">
          Opportunities
        </p>
        <h1 className="ai-display mt-4 text-4xl leading-[1.1] text-[#1a1c1e] md:text-6xl">Job Finder</h1>
        <p className="mt-2 text-sm text-[#44474e] md:text-base">Create your AI CV profile in seconds.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className={inputClass} />
          <input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className={inputClass} />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className={inputClass} />
          <select value={workType} onChange={(e) => setWorkType(e.target.value as "Local" | "Remote")} className={inputClass}>
            <option value="Local">Local</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        <div className="mt-4 rounded-2xl border border-[var(--ai-border)] bg-white p-4">
          <p className="text-sm font-semibold text-[#1a1c1e]">Skills</p>
          <div className="mt-2 flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill();
                }
              }}
              placeholder="Type a skill and press Enter"
              className="w-full rounded-xl border border-[var(--ai-border)] bg-[#f8f8fd] px-3 py-2 text-sm outline-none focus:border-[#005ac2]"
            />
            <button type="button" onClick={addSkill} className="rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-4 py-2 text-sm font-semibold text-white">
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

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <textarea value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="Experience" className={`min-h-[110px] ${inputClass}`} />
          <textarea value={education} onChange={(e) => setEducation(e.target.value)} placeholder="Education" className={`min-h-[110px] ${inputClass}`} />
          <textarea value={projects} onChange={(e) => setProjects(e.target.value)} placeholder="Projects" className={`min-h-[110px] ${inputClass}`} />
          <select value={seniority} onChange={(e) => setSeniority(e.target.value as Seniority)} className={inputClass}>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="mt-4 rounded-2xl border border-dashed border-[#005ac2]/35 bg-[#005ac2]/5 p-4">
          <label className="cursor-pointer text-sm font-semibold text-[#005ac2]">
            Upload CV (optional PDF)
            <input type="file" accept=".pdf" className="mt-2 block text-xs text-[#44474e]" onChange={(e) => setCvFileName(e.target.files?.[0]?.name ?? "")} />
          </label>
          {cvFileName ? <p className="mt-2 text-xs text-[#44474e]">Selected: {cvFileName}</p> : null}
        </div>

        <button type="button" disabled={loading} onClick={startGeneration} className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(0,90,194,0.35)] disabled:opacity-70">
          Generate AI Profile
        </button>
      </GlassCard>

      {(loading || completed) && (
        <GlassCard>
          <h2 className="ai-heading text-xl font-bold text-[#1a1c1e]">Analyzing...</h2>
          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-[#005ac2] to-[#6801d1] transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-sm text-[#44474e]">{progress}% complete</p>
        </GlassCard>
      )}

      {completed && (
        <>
          <GlassCard>
            <h2 className="ai-heading text-xl font-bold text-[#1a1c1e]">AI Generated Profile Summary</h2>
            <p className="mt-3 text-sm leading-6 text-[#44474e]">{profileSummary}</p>
            <p className="mt-3 text-xs text-[#44474e]/70">Education: {education || "Not provided"} | Projects: {projects || "Not provided"}</p>
          </GlassCard>

          <GlassCard>
            <h2 className="ai-heading text-xl font-bold text-[#1a1c1e]">Matching Jobs</h2>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {matchedJobs.map((result) => (
                <JobCard
                  key={result.job.id}
                  title={result.job.title}
                  match={result.match}
                  matchedSkills={result.matchedSkills.length > 0 ? result.matchedSkills : result.job.skills.slice(0, 3)}
                  description={`Skills match: ${result.matchedSkills.length > 0 ? result.matchedSkills.join(", ") : "Partial match based on profile context"}`}
                  actionLabel="View Job"
                />
              ))}
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
};
