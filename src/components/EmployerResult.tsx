import type { EmployerResponse, CandidateMatch } from "../types/api";

interface EmployerResultProps {
  result: EmployerResponse;
}

interface CandidateCardProps {
  candidate: CandidateMatch;
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
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
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md">
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
          <p className="text-sm text-slate-600 leading-relaxed">
            {candidate.reasoning}
          </p>
          <div className="pt-1">
            <span className="inline-block rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600 capitalize">
              {candidate.recommendation.replace(/_/g, " ")}
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
    </div>
  );
};

export const EmployerResult = ({ result }: EmployerResultProps) => {
  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      {/* Summary Section */}
      {result.total_matches > 0 && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Candidate Matches
          </h3>
          <p className="text-sm text-slate-600">
            Found {result.total_matches} potential candidate
            {result.total_matches !== 1 ? "s" : ""} for this position
          </p>
        </div>
      )}

      {/* Matches List */}
      {result.matches && result.matches.length > 0 ? (
        <div className="space-y-3">
          {result.matches.map((candidate) => (
            <CandidateCard key={candidate.rank} candidate={candidate} />
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
  );
};
