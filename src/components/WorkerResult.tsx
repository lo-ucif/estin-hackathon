import type { WorkerResponse } from "../types/api";

interface WorkerResultProps {
  result: WorkerResponse;
}

export const WorkerResult = ({ result }: WorkerResultProps) => {
  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
      {/* Summary Section */}
      {result.summary && (
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Profile Summary
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            {result.summary}
          </p>
        </div>
      )}

      {/* Skills Highlights */}
      {result.skills_highlight && result.skills_highlight.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Key Skills</h3>
          <div className="flex flex-wrap gap-2">
            {result.skills_highlight.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Roles */}
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
    </div>
  );
};
