import { NavLink } from "react-router-dom";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `border-b-2 px-1 py-1 text-sm font-medium transition ${
    isActive
      ? "border-[#005ac2] text-[#005ac2]"
      : "border-transparent text-[#44474e] hover:text-[#1a1c1e]"
  }`;

export const Navbar = () => {
  return (
    <header className="border-b border-[rgba(196,198,208,0.3)] bg-[rgba(248,249,255,0.8)] px-6 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <NavLink to="/" className="ai-heading bg-gradient-to-r from-[#005ac2] to-[#6801d1] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
          ai-power-job
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkClass}>
            Opportunities
          </NavLink>
          <a href="#how" className="text-sm text-[#44474e] transition hover:text-[#1a1c1e]">
            How
          </a>
          <a href="#features" className="text-sm text-[#44474e] transition hover:text-[#1a1c1e]">
            features
          </a>
          <a href="#ready" className="text-sm text-[#44474e] transition hover:text-[#1a1c1e]">
            Ready to get started
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink to="/jobs" className="hidden rounded-md bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-5 py-2 text-sm font-bold text-white shadow-[0_12px_24px_rgba(0,90,194,0.25)] md:inline-flex">
            Get Started
          </NavLink>
          <NavLink to="/upload" className="md:hidden rounded-md border border-[var(--ai-border)] px-3 py-2 text-sm text-[#1a1c1e]">
            Post
          </NavLink>
        </div>
      </div>
    </header>
  );
};
