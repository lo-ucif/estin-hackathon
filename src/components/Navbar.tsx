import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const sectionLinkClass = (isActive: boolean) =>
  `border-b-2 px-1 py-1 text-sm font-medium transition ${
    isActive
      ? "border-[#005ac2] text-[#005ac2]"
      : "border-transparent text-[#44474e] hover:text-[#1a1c1e]"
  }`;

const sectionIds = ["opportunities", "how", "features", "ready"];

export const Navbar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(null);
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          );

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        } else {
          setActiveSection("opportunities");
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-25% 0px -50% 0px",
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgba(196,198,208,0.3)] bg-[rgba(248,249,255,0.95)] px-6 py-4 shadow-[0_2px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex flex-wrap items-center justify-between gap-4 max-w-[1280px]">
        <NavLink
          to="/"
          className="ai-heading bg-gradient-to-r from-[#005ac2] to-[#6801d1] bg-clip-text text-2xl font-bold tracking-tight text-transparent"
        >
          ai-power-job
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink
            to="/"
            className={sectionLinkClass(activeSection === "opportunities")}
          >
            Opportunities
          </NavLink>
          <a href="#how" className={sectionLinkClass(activeSection === "how")}>
            How
          </a>
          <a
            href="#features"
            className={sectionLinkClass(activeSection === "features")}
          >
            Features
          </a>
          <a
            href="#ready"
            className={sectionLinkClass(activeSection === "ready")}
          >
            Ready to get started
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/jobs"
            className="hidden rounded-md bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-5 py-2 text-sm font-bold text-white shadow-[0_12px_24px_rgba(0,90,194,0.25)] md:inline-flex"
          >
            Contact us
          </NavLink>
          <NavLink
            to="/upload"
            className="md:hidden rounded-md border border-[var(--ai-border)] px-3 py-2 text-sm text-[#1a1c1e]"
          >
            Post
          </NavLink>
        </div>
      </div>
    </header>
  );
};
