import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";


export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f8fb] to-white p-6 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 backdrop-blur-sm">
          <p className="text-lg font-semibold text-slate-900">
            ESTIN Hackathon
          </p>
          <nav className="flex items-center gap-2">
            <Link to="/dashboard">
              <Button variant="primary">Dashboard</Button>
            </Link>
            <Link to="/weekly">
              <Button variant="outline">Weekly Sequence</Button>
            </Link>
          </nav>
        </header>

        <section className="rounded-3xl bg-slate-900 p-8 text-white md:p-12">
          <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            Default Home
          </p>
          <h1 className="max-w-3xl text-3xl font-bold leading-tight md:text-5xl">
            Manage your finances and workflow from one clean dashboard
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-200 md:text-base">
            This is now the default home page of your React + Vite app. Use it
            as the main entry point to jump into the dashboard and weekly
            progress tools.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/dashboard">
              <Button variant="primary">Open Dashboard</Button>
            </Link>
            <Link to="/weekly">
              <Button variant="secondary">Go To Weekly</Button>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Fast Access
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Start from home, then navigate to the dashboard with one click.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Clear Structure
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Your root route (`/`) is now a clean, default page for the app.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Ready To Scale
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Add metrics, announcements, or onboarding blocks here as needed.
            </p>
          </article>
        </section>
      </div>

    </div>
  );
};
