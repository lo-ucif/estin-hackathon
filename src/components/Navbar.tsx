import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition ${
    isActive
      ? "bg-[#26a4ff] text-white shadow-[0_10px_25px_rgba(38,164,255,0.35)]"
      : "text-slate-600 hover:bg-white hover:text-slate-900"
  }`;

export const Navbar = () => {
  return (
    <header className="rounded-3xl border border-white/60 bg-white/80 px-5 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <NavLink to="/" className="text-3xl font-extrabold tracking-tight text-[#26a4ff]">
          AI Job
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/jobs" className={navLinkClass}>
            Jobs
          </NavLink>
          <NavLink to="/upload" className={navLinkClass}>
            Upload CV
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
