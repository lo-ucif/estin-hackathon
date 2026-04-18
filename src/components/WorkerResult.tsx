import type { WorkerResponse } from "../types/api";

interface WorkerResultProps {
  result: WorkerResponse;
}

export const WorkerResult = ({ result }: WorkerResultProps) => {
  const summary = result.worker_profile?.profile_summary || result.summary;
  const skills = result.worker_profile?.skills || result.skills_highlight || [];
  
  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-800">
          {result.worker_profile?.name || "Profile Analysis"}
        </h2>
        {result.worker_profile?.seniority && (
          <p className="mt-1 text-sm font-medium capitalize text-slate-500">
            {result.worker_profile.seniority} Level Professional
          </p>
        )}
      </div>

      {/* Summary Section */}
      {summary && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Profile Summary
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {summary}
          </p>
        </div>
      )}

      {/* Skills Highlights */}
      {skills.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 capitalize"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Roles / Matches Summary */}
      {result.recommended_roles && result.recommended_roles.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">
            Recommended Roles
          </h3>
          <div className="space-y-2">
            {result.recommended_roles.map((role, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-semibold text-white">
                  {index + 1}
                </div>
                <p className="text-sm text-slate-700 font-medium">{role}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.total_matches !== undefined && (
        <div className="mt-4 rounded-lg bg-indigo-50 p-4 border border-indigo-100">
          <p className="text-sm font-semibold text-indigo-900">
            🎉 Found {result.total_matches} Job Match{result.total_matches !== 1 && 'es'}!
          </p>
          <p className="mt-1 text-xs text-indigo-700">
            Scroll down to see the opportunities recommended by AI.
          </p>
        </div>
      )}
    </div>
  );
};
