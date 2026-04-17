import { Link } from "react-router-dom";
import { JobCard } from "../components/JobCard";
import { jobs } from "../data/jobs";

export const HomePage = () => {
  const recommendedJobs = jobs.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="grid gap-8 rounded-3xl border border-white/50 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)] md:grid-cols-[1.2fr_0.8fr] md:p-10">
        <div className="flex flex-col justify-center">
          <p className="mb-4 inline-flex w-fit items-center rounded-full bg-[#26a4ff]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#26a4ff]">
            AI-Powered Recruitment
          </p>
          <h1 className="max-w-xl text-4xl font-black leading-tight text-[#25324b] md:text-6xl">
            AI Finds The Best Job For You
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-500">
            Upload your CV and instantly get matched with the best opportunities.
          </p>
          <div className="mt-8">
            <Link
              to="/upload"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#26a4ff] to-[#7c3aed] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(38,164,255,0.35)]"
            >
              Upload Your CV
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-[#26a4ff]/15 via-white to-[#7c3aed]/15 p-6">
          <div className="flex h-full flex-col justify-between rounded-2xl border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">AI Match Snapshot</p>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Top match</p>
                <p className="mt-1 text-xl font-bold text-[#25324b]">
                  {recommendedJobs[0].title}
                </p>
                <p className="text-sm text-[#26a4ff]">{recommendedJobs[0].match}% Match</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs text-slate-500">Skills recognized</p>
                <p className="mt-1 text-xl font-bold text-[#25324b]">12 Skills</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-white/50 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)] md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-[#25324b]">Recommended Jobs</h2>
            <p className="text-sm text-slate-500">
              Personalized results generated instantly by AI.
            </p>
          </div>
          <Link to="/jobs" className="text-sm font-semibold text-[#26a4ff]">
            View all jobs
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {recommendedJobs.map((job) => (
            <JobCard key={job.id} job={job} actionLabel="View Job" />
          ))}
        </div>
      </section>
    </div>
  );
};
