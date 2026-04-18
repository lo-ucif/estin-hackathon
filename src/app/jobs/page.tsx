import { useState } from "react";
import { ClickableJobCard } from "../../components/ClickableJobCard";
import { jobs } from "../../data/jobs";
import type { CandidateGeneratedProfile, ExperienceLevel } from "../../types";
import { matchJobsForProfile } from "../../utils/matcher";
import { saveGeneratedProfile } from "../../utils/profileStore";
import { useSubmitWorkerProfile } from "../../hooks/useRecruitmentApi";
import { WorkerResult } from "../../components/WorkerResult";
import { Toast, useToast } from "../../components/Toast";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <section className="rounded-[30px] border border-[rgba(196,198,208,0.4)] bg-[rgba(255,255,255,0.72)] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.06)] backdrop-blur-[10px] md:p-8">
    {children}
  </section>
);

const inputClass =
  "rounded-xl border border-[var(--ai-border)] bg-white px-4 py-3 text-sm outline-none focus:border-[#005ac2]";

export const JobsPage = () => {
  const [name, setName] = useState("Ahmed Test");
  const [experienceYears, setExperienceYears] = useState(5);
  const [location, setLocation] = useState("Remote");
  const [seniority, setSeniority] = useState<ExperienceLevel>("Junior");
  const [cv, setCv] = useState("Frontend developer with React experience");
  const [email, setEmail] = useState("test@email.com");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["React", "Java", "SQL"]);

  // API Integration
  const {
    submit: submitWorkerProfile,
    loading,
    error,
    data: apiResponse,
  } = useSubmitWorkerProfile();
  const { toast, showToast, hideToast } = useToast();

  const addSkill = () => {
    const value = skillInput.trim();
    if (!value || skills.includes(value)) return;
    setSkills((current) => [...current, value]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setSkills((current) => current.filter((item) => item !== skill));
  };

  const handleGenerateProfile = async () => {
    // Validation
    if (!name.trim()) {
      showToast("Please enter your name", "error");
      return;
    }
    if (skills.length === 0) {
      showToast("Please add at least one skill", "error");
      return;
    }
    if (!email.trim()) {
      showToast("Please enter your email address", "error");
      return;
    }

    try {
      const payload = {
        type: "worker" as const,
        name,
        skills,
        location,
        experience_years: experienceYears,
        seniority: seniority.toLowerCase() as "junior" | "mid" | "senior",
        cv,
        email,
      };

      const result = await submitWorkerProfile(payload);
      showToast("Profile analyzed successfully!", "success");

      // Save to local storage for reference
      const profile: CandidateGeneratedProfile = {
        id: "generated-profile",
        name,
        age: experienceYears.toString(),
        location,
        workType: "Remote",
        seniority: seniority as ExperienceLevel,
        skills,
        experienceText: cv,
        education: "",
        projects: "",
        summary: result.summary || `${name}'s professional profile`,
        contact: {
          phone: "",
          whatsapp: "",
          email,
          linkedIn: "",
          allowDirectContact: true,
        },
      };
      saveGeneratedProfile(profile);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to submit profile";
      showToast(errorMsg, "error");
    }
  };

  return (
    <div className="space-y-6">
      <GlassCard>
        <p className="inline-flex rounded-xl border border-[var(--ai-border)] bg-white px-4 py-1.5 text-xs font-medium text-[#005ac2]">
          Opportunities
        </p>
        <h1 className="ai-display mt-4 text-4xl leading-[1.1] text-[#1a1c1e] md:text-6xl">
          Job Finder
        </h1>
        <p className="mt-2 text-sm text-[#44474e] md:text-base">
          Create your AI CV profile in seconds.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={inputClass}
          />
          <input
            type="number"
            value={experienceYears}
            onChange={(e) => setExperienceYears(parseInt(e.target.value) || 0)}
            placeholder="Experience Years"
            className={inputClass}
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className={inputClass}
          />
          <select
            value={seniority}
            onChange={(e) => setSeniority(e.target.value as ExperienceLevel)}
            className={inputClass}
          >
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <div className="mt-4">
          <textarea
            value={cv}
            onChange={(e) => setCv(e.target.value)}
            placeholder="CV Description"
            className={`w-full min-h-[110px] ${inputClass}`}
          />
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

        <div className="mt-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className={inputClass}
          />
        </div>

        <button
          type="button"
          disabled={loading}
          onClick={handleGenerateProfile}
          className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(0,90,194,0.35)] disabled:opacity-70 disabled:cursor-not-allowed transition"
        >
          {loading ? "Analyzing profile..." : "Generate AI Profile"}
        </button>
      </GlassCard>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Loading State */}
      {loading && (
        <GlassCard>
          <LoadingSpinner message="Analyzing profile..." size="md" />
        </GlassCard>
      )}

      {/* Error State */}
      {error && (
        <GlassCard>
          <div className="rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-900">Error</p>
            <p className="mt-1 text-sm text-red-700">{error}</p>
          </div>
        </GlassCard>
      )}

      {/* API Response Results */}
      {apiResponse && apiResponse.success && (
        <>
          <WorkerResult result={apiResponse} />

          {/* Matching Jobs from Mock Data */}
          <GlassCard>
            <h2 className="ai-heading text-xl font-bold text-[#1a1c1e]">
              Recommended Jobs
            </h2>
            <p className="mt-1 text-sm text-[#44474e]">
              Based on your profile and skills. Click any job to view full
              details.
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {matchJobsForProfile(skills, jobs, seniority)
                .slice(0, 3)
                .map((result) => (
                  <ClickableJobCard
                    key={result.job.id}
                    job={result.job}
                    match={result.match}
                    matchedSkills={
                      result.matchedSkills.length > 0
                        ? result.matchedSkills
                        : result.job.skills.slice(0, 3)
                    }
                    analyzing={false}
                  />
                ))}
            </div>
          </GlassCard>
        </>
      )}
    </div>
  );
};
