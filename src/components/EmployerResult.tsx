import { useState } from "react";
import type { EmployerResponse, CandidateMatch } from "../types/api";

interface EmployerResultProps {
  result: EmployerResponse;
}

interface CandidateCardProps {
  candidate: CandidateMatch;
  onSelect: (candidate: CandidateMatch) => void;
}

interface CandidateDetailModalProps {
  candidate: CandidateMatch | null;
  onClose: () => void;
}

const CandidateCard = ({ candidate, onSelect }: CandidateCardProps) => {
  // Color coding based on match score
  let scoreColor = "bg-red-100 text-red-700";
  if (candidate.match_score >= 80) {
    scoreColor = "bg-green-100 text-green-700";
  } else if (candidate.match_score >= 60) {
    scoreColor = "bg-blue-100 text-blue-700";
  } else if (candidate.match_score >= 40) {
    scoreColor = "bg-yellow-100 text-yellow-700";
  }

  return (
    <button
      onClick={() => onSelect(candidate)}
      className="w-full rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg hover:border-[#005ac2]/50 cursor-pointer text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
              #{candidate.rank}
            </span>
            <h4 className="text-base font-semibold text-slate-900">
              {candidate.candidate_name}
            </h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
            {candidate.reasoning}
          </p>
          <div className="pt-1 flex items-center gap-2">
            <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 capitalize">
              {candidate.recommendation.replace(/_/g, " ")}
            </span>
            <span className="text-xs text-slate-500">
              Click to view details
            </span>
          </div>
        </div>

        {/* Match Score Badge */}
        <div
          className={`flex flex-shrink-0 flex-col items-center justify-center rounded-lg ${scoreColor} px-3 py-2`}
        >
          <span className="text-2xl font-bold">{candidate.match_score}%</span>
          <span className="text-xs font-medium">Match</span>
        </div>
      </div>
    </button>
  );
};

const CandidateDetailModal = ({
  candidate,
  onClose,
}: CandidateDetailModalProps) => {
  if (!candidate) return null;

  let scoreColor = "bg-red-100 text-red-700";
  if (candidate.match_score >= 80) {
    scoreColor = "bg-green-100 text-green-700";
  } else if (candidate.match_score >= 60) {
    scoreColor = "bg-blue-100 text-blue-700";
  } else if (candidate.match_score >= 40) {
    scoreColor = "bg-yellow-100 text-yellow-700";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex flex-col items-center justify-center rounded-lg ${scoreColor} px-4 py-3`}
              >
                <span className="text-3xl font-bold">
                  {candidate.match_score}%
                </span>
                <span className="text-xs font-medium">Match Score</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900">
                  {candidate.candidate_name}
                </h2>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
                    #{candidate.rank}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 capitalize">
                    {candidate.recommendation.replace(/_/g, " ")}
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
          {/* Match Analysis */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-slate-900">
              Match Analysis
            </h3>
            <p className="text-base text-slate-700 leading-relaxed">
              {candidate.reasoning}
            </p>
          </div>

          {/* Match Quality Indicator */}
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
                  {candidate.match_score}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full transition-all ${
                    candidate.match_score >= 80
                      ? "bg-green-500"
                      : candidate.match_score >= 60
                        ? "bg-blue-500"
                        : candidate.match_score >= 40
                          ? "bg-yellow-500"
                          : "bg-red-500"
                  }`}
                  style={{ width: `${candidate.match_score}%` }}
                />
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-slate-900">
              Recommendation
            </h3>
            <div
              className={`rounded-lg p-4 ${
                candidate.recommendation === "strong_match"
                  ? "bg-green-50 border border-green-200"
                  : candidate.recommendation === "good_match"
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-yellow-50 border border-yellow-200"
              }`}
            >
              <p className="font-semibold text-slate-900 capitalize mb-2">
                {candidate.recommendation.replace(/_/g, " ")}
              </p>
              <p className="text-sm text-slate-700">
                {candidate.recommendation === "strong_match"
                  ? "This candidate is an excellent fit for the position with all or most required qualifications."
                  : candidate.recommendation === "good_match"
                    ? "This candidate is a good fit for the position with strong qualifications."
                    : "This candidate has moderate qualifications and could be a potential fit with some training."}
              </p>
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
                const messageText = `I'm interested in contacting ${candidate.candidate_name} who has a ${candidate.match_score}% match score for this position.`;
                navigator.clipboard.writeText(messageText);
                alert("Candidate info copied to clipboard!");
              }}
              className="flex-1 rounded-lg bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-4 py-3 text-sm font-semibold text-white transition hover:shadow-lg"
            >
              Copy Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmployerResult = ({ result }: EmployerResultProps) => {
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateMatch | null>(null);

  return (
    <>
      <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
        {/* Summary Section */}
        {result.total_matches > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">
              Candidate Matches
            </h3>
            <p className="text-sm text-slate-600">
              Found {result.total_matches} potential candidate
              {result.total_matches !== 1 ? "s" : ""} for this position. Click
              on any candidate to view details.
            </p>
          </div>
        )}

        {/* Matches List */}
        {result.matches && result.matches.length > 0 ? (
          <div className="space-y-3">
            {result.matches.map((candidate) => (
              <CandidateCard
                key={candidate.rank}
                candidate={candidate}
                onSelect={setSelectedCandidate}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
            <p className="text-sm text-amber-800">
              No candidates matched this job posting.
            </p>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </>
  );
};
