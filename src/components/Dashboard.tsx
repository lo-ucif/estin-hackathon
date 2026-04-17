type DashboardProps = {
  totalJobs: number;
  topMatch: {
    job: {
      id: string;
      title: string;
      company: string;
    };
    score: number;
  };
  resumeText: string;
};

export const Dashboard = ({
  totalJobs,
  topMatch,
  resumeText,
}: DashboardProps) => {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Dashboard</p>
          <p className="mt-1 text-sm text-slate-500">
            See a quick summary of your matching profile.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[28px] bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Visible opportunities</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {totalJobs}
            </p>
          </div>
          <div className="rounded-[28px] bg-slate-50 p-5">
            <p className="text-sm text-slate-500">Current resume length</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {resumeText.length} chars
            </p>
          </div>
        </div>

        <div className="rounded-[28px] bg-slate-50 p-5">
          <p className="text-sm text-slate-500">Best match</p>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-slate-950">
                {topMatch.job.title}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {topMatch.job.company}
              </p>
            </div>
            <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
              {topMatch.score}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
