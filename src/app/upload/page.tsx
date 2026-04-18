import { useState } from "react";
import type { ExperienceLevel, WorkType } from "../../types";
import { useSubmitEmployerJob } from "../../hooks/useRecruitmentApi";
import { EmployerResult } from "../../components/EmployerResult";
import { Toast, useToast } from "../../components/Toast";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <section className="rounded-[30px] border border-[rgba(196,198,208,0.4)] bg-[rgba(255,255,255,0.72)] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.06)] backdrop-blur-[10px] md:p-8">
    {children}
  </section>
);

export const UploadPage = () => {
  const [jobTitle, setJobTitle] = useState(
    "Senior Frontend Engineer (React Specialist)",
  );
  const [company, setCompany] = useState("AI Tech Studio");
  const [jobDescription, setJobDescription] = useState(
    "We are looking for a senior frontend engineer with strong experience in React and GraphQL to build scalable web applications. The candidate should have deep knowledge in frontend architecture, API integration, and database interactions.",
  );
  const [experienceLevel, setExperienceLevel] =
    useState<ExperienceLevel>("Senior");
  const [location, setLocation] = useState("Remote");
  const [workType, setWorkType] = useState<WorkType>("Remote");
  const [skills, setSkills] = useState<string[]>([
    "React",
    "GraphQL",
    "TypeScript",
    "SQL",
    "Redux",
    "Frontend Architecture",
  ]);
  const [skillInput, setSkillInput] = useState("");
  const [pdfName, setPdfName] = useState("");

  // API Integration
  const {
    submit: submitEmployerJob,
    loading,
    error,
    data: apiResponse,
  } = useSubmitEmployerJob();
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

  const handlePostJob = async () => {
    // Validation
    if (!jobTitle.trim()) {
      showToast("Please enter a job title", "error");
      return;
    }
    if (!company.trim()) {
      showToast("Please enter your company name", "error");
      return;
    }
    if (skills.length === 0) {
      showToast("Please add at least one required skill", "error");
      return;
    }

    try {
      const payload = {
        type: "employer" as const,
        title: jobTitle,
        company,
        skills_required: skills,
        location: location || "Not specified",
        description: jobDescription || "Job role details",
      };

      await submitEmployerJob(payload);
      showToast("Job posted successfully! Analyzing candidates...", "success");
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "Failed to post job";
      showToast(errorMsg, "error");
    }
  };

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
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company Name"
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
          onClick={handlePostJob}
          disabled={loading}
          className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_26px_rgba(0,90,194,0.35)] disabled:opacity-70 disabled:cursor-not-allowed transition"
        >
          {loading ? "Processing job..." : "Generate Job Profile"}
        </button>
      </GlassCard>

      {/* Toast Notification */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Loading State */}
      {loading && (
        <GlassCard>
          <LoadingSpinner
            message="Processing job and finding candidates..."
            size="md"
          />
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
        <EmployerResult result={apiResponse} />
      )}
    </div>
  );
};
