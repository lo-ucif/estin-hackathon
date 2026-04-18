import { useState } from "react";
import type { Job } from "../types";
import { MatchBadge } from "./MatchBadge";

interface ClickableJobCardProps {
  job: Job;
  matchedSkills: string[];
  match: number;
  analyzing?: boolean;
}

interface JobDetailModalProps {
  job: Job | null;
  matchedSkills: string[];
  match: number;
  onClose: () => void;
}

const JobDetailModal = ({
  job,
  matchedSkills,
  match,
  onClose,
}: JobDetailModalProps) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex-1">
            <div className="flex items-start gap-4 mb-3">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900">
                  {job.title}
                </h2>
                <p className="text-lg text-slate-600 mt-1">{job.company}</p>
                <div className="mt-3 flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                    Match: {match}%
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                    {job.experience} Level
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 py-6">
          {/* Key Information */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase text-slate-600 tracking-wider">
                Location
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {job.location}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase text-slate-600 tracking-wider">
                Work Type
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {job.workType}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase text-slate-600 tracking-wider">
                Salary Range
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {job.salaryLabel}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase text-slate-600 tracking-wider">
                Experience
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {job.experience} Developer
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">
              Job Description
            </h3>
            <p className="text-base text-slate-700 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Required Skills */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">
              Required Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Your Matched Skills */}
          {matchedSkills.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900">
                Your Matching Skills
              </h3>
              <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Match Quality */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">
              Match Quality
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">
                  Overall Match
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {match}%
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full transition-all ${
                    match >= 80
                      ? "bg-green-500"
                      : match >= 60
                        ? "bg-blue-500"
                        : match >= 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                  style={{ width: `${match}%` }}
                />
              </div>
            </div>
          </div>

          {/* Employer Contact */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">
              Contact Employer
            </h3>
            <div className="flex flex-wrap gap-3">
              {job.employerContact.email && (
                <a
                  href={`mailto:${job.employerContact.email}`}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-100 transition"
                >
                  📧 Email: {job.employerContact.email}
                </a>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                const messageText = `I'm interested in applying for the ${job.title} position at ${job.company}. My matching skills: ${matchedSkills.join(", ")}. Match score: ${match}%`;
                navigator.clipboard.writeText(messageText);
                alert("Job info copied to clipboard!");
              }}
              className="flex-1 rounded-lg bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-4 py-3 text-sm font-semibold text-white transition hover:shadow-lg"
            >
              Copy Job Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClickableJobCard = ({
  job,
  matchedSkills,
  match,
  analyzing = false,
}: ClickableJobCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDetails(true)}
        className="relative w-full rounded-3xl border border-white/50 bg-white p-6 shadow-[0_10px_30px_rgba(30,41,59,0.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(30,41,59,0.12)] text-left"
      >
        <div className="absolute right-5 top-5">
          <MatchBadge percent={match} analyzing={analyzing} />
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#44474e]/70">
              AI Match
            </p>
            <h3 className="mt-2 text-xl font-bold text-[#1a1c1e]">
              {job.title}
            </h3>
            <p className="mt-1 text-sm text-[#44474e]">{job.company}</p>
            <p className="mt-1 text-xs text-slate-500">Click to view details</p>
          </div>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#44474e] line-clamp-2">
          {job.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {matchedSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700"
            >
              {skill}
            </span>
          ))}
          {matchedSkills.length > 3 && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
              +{matchedSkills.length - 3} more
            </span>
          )}
        </div>

        <div className="mt-6 block w-full rounded-xl bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-4 py-2.5 text-center text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,90,194,0.35)] transition hover:opacity-95">
          View Job Details
        </div>
      </button>

      <JobDetailModal
        job={showDetails ? job : null}
        matchedSkills={matchedSkills}
        match={match}
        onClose={() => setShowDetails(false)}
      />
    </>
  );
};
