import { useState } from "react";
import { JobCard } from "../../components/JobCard";
import { jobs } from "../../data/jobs";
import type {
  CandidateGeneratedProfile,
  ContactInfo,
  ExperienceLevel,
  WorkType,
} from "../../types";
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

const iconChipClass =
  "inline-flex items-center rounded-full border border-[#005ac2]/20 bg-[#005ac2]/8 px-3 py-1 text-xs font-semibold text-[#005ac2]";

export const JobsPage = () => {
  const [fullName, setFullName] = useState("Ahmed Test");
  const [age, setAge] = useState("2");
  const [location, setLocation] = useState("Remote");
  const [workType, setWorkType] = useState<WorkType>("Remote");
  const [experience, setExperience] = useState(
    "Frontend developer with React experience",
  );
  const [education, setEducation] = useState("");
  const [projects, setProjects] = useState("");
  const [seniority, setSeniority] = useState<ExperienceLevel>("Junior");
  const [cvFileName, setCvFileName] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>(["React", "Java", "SQL"]);

  const [contact, setContact] = useState<ContactInfo>({
    phone: "",
    whatsapp: "",
    email: "test@email.com",
    linkedIn: "",
    allowDirectContact: true,
  });

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
    if (!fullName.trim()) {
      showToast("Please enter your full name", "error");
      return;
    }
    if (skills.length === 0) {
      showToast("Please add at least one skill", "error");
      return;
    }
    if (!contact.email.trim()) {
      showToast("Please enter your email address", "error");
      return;
    }

    try {
      const cv =
        `Name: ${fullName}\n` +
        `Location: ${location || "Not specified"}\n` +
        `Seniority: ${seniority}\n` +
        `Experience: ${experience || "Not specified"}\n` +
        `Education: ${education || "Not specified"}\n` +
        `Projects: ${projects || "Not specified"}`;

      const payload = {
        type: "worker" as const,
        name: fullName,
        skills,
        location: location || "Not specified",
        experience_years: parseInt(age) || 0,
        seniority: seniority.toLowerCase() as "junior" | "mid" | "senior",
        cv,
        email: contact.email,
      };

      const result = await submitWorkerProfile(payload);
      showToast("Profile analyzed successfully!", "success");

      // Save to local storage for reference
      const profile: CandidateGeneratedProfile = {
        id: "generated-profile",
        name: fullName,
        age,
        location: location || "Not specified",
        workType,
        seniority,
        skills,
        experienceText: experience,
        education,
        projects,
        summary: result.summary || `${fullName}'s professional profile`,
        contact,
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className={inputClass}
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Age"
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
            <option value="Local">Local</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Onsite">Onsite</option>
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

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Experience"
            className={`min-h-[110px] ${inputClass}`}
          />
          <textarea
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Education"
            className={`min-h-[110px] ${inputClass}`}
          />
          <textarea
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            placeholder="Projects"
            className={`min-h-[110px] ${inputClass}`}
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

        <div className="mt-4 rounded-2xl border border-dashed border-[#005ac2]/35 bg-[#005ac2]/5 p-4">
          <label className="cursor-pointer text-sm font-semibold text-[#005ac2]">
            Upload CV (optional PDF)
            <input
              type="file"
              accept=".pdf"
              className="mt-2 block text-xs text-[#44474e]"
              onChange={(e) => setCvFileName(e.target.files?.[0]?.name ?? "")}
            />
          </label>
          {cvFileName ? (
            <p className="mt-2 text-xs text-[#44474e]">
              Selected: {cvFileName}
            </p>
          ) : null}
        </div>

        <div className="mt-5 rounded-2xl border border-[var(--ai-border)] bg-white p-4">
          <h2 className="ai-heading text-lg font-bold text-[#1a1c1e]">
            Contact Information
          </h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input
              value={contact.phone}
              onChange={(e) =>
                setContact((c) => ({ ...c, phone: e.target.value }))
              }
              placeholder="Phone Number"
              className={inputClass}
            />
            <input
              value={contact.whatsapp ?? ""}
              onChange={(e) =>
                setContact((c) => ({ ...c, whatsapp: e.target.value }))
              }
              placeholder="WhatsApp Number (optional)"
              className={inputClass}
            />
            <input
              value={contact.email}
              onChange={(e) =>
                setContact((c) => ({ ...c, email: e.target.value }))
              }
              placeholder="Email Address"
              className={inputClass}
            />
            <input
              value={contact.linkedIn ?? ""}
              onChange={(e) =>
                setContact((c) => ({ ...c, linkedIn: e.target.value }))
              }
              placeholder="LinkedIn Profile (optional)"
              className={inputClass}
            />
          </div>

          <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--ai-border)] bg-[#f8f8fd] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[#1a1c1e]">
                Allow employers to contact me directly
              </p>
              <p className="text-xs text-[#44474e]">
                {contact.allowDirectContact
                  ? "ON: contact visible in profile"
                  : "OFF: privacy mode enabled"}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                setContact((c) => ({
                  ...c,
                  allowDirectContact: !c.allowDirectContact,
                }))
              }
              className={`relative h-8 w-14 rounded-full transition ${
                contact.allowDirectContact
                  ? "bg-gradient-to-r from-[#005ac2] to-[#6801d1]"
                  : "bg-slate-300"
              }`}
              aria-label="Toggle direct contact"
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                  contact.allowDirectContact ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className={iconChipClass}>📞 Phone</span>
            <span className={iconChipClass}>💬 WhatsApp</span>
            <span className={iconChipClass}>📧 Email</span>
            <span className={iconChipClass}>🔗 LinkedIn</span>
          </div>
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
              Based on your profile and skills
            </p>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {matchJobsForProfile(skills, jobs, seniority)
                .slice(0, 3)
                .map((result) => (
                  <JobCard
                    key={result.job.id}
                    jobId={result.job.id}
                    title={result.job.title}
                    match={result.match}
                    matchedSkills={
                      result.matchedSkills.length > 0
                        ? result.matchedSkills
                        : result.job.skills.slice(0, 3)
                    }
                    description={`Skills match: ${result.matchedSkills.length > 0 ? result.matchedSkills.join(", ") : "Partial match based on profile context"}`}
                    actionLabel="View Job"
                    actionTo={`/jobs/${result.job.id}`}
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
