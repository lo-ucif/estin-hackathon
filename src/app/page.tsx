import { Link } from "react-router-dom";

const imgHero =
  "https://www.figma.com/api/mcp/asset/acef9e41-41c0-4693-800f-d44fa4ffd1d4";
const imgUnderline =
  "https://www.figma.com/api/mcp/asset/3ea429b8-9a56-47d7-be66-306c4fd480f2";
const imgReady =
  "https://www.figma.com/api/mcp/asset/a81197bb-76e4-49d8-b010-46a6e8257e2d";

const features = [
  {
    title: "AI CV Matching",
    text: "AI CV jobs or hire talent using AI CV-driven matching and smart profiles.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M17.7324 3.44092V7.93592C17.7324 8.54467 17.9762 9.12967 18.4074 9.56092C18.841 9.99263 19.428 10.2349 20.0399 10.2347H25.1962"
          stroke="#005AC2"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.55875 9.55854H13.64M9.55875 14.9998H20.4413M9.55875 20.441H20.4413M25.3125 10.7098V21.4198C25.2877 22.1203 25.1245 22.809 24.8323 23.4462C24.5401 24.0834 24.1247 24.6564 23.61 25.1323C23.0949 25.6104 22.4906 25.9823 21.8318 26.2268C21.1729 26.4713 20.4723 26.5836 19.77 26.5573H10.2825C9.57592 26.5896 8.86992 26.4821 8.20497 26.241C7.54002 25.9999 6.92919 25.6299 6.4075 25.1523C5.88784 24.6751 5.46818 24.0994 5.17291 23.4587C4.87764 22.8179 4.71264 22.1249 4.6875 21.4198V8.57729C4.71232 7.87676 4.87553 7.18806 5.16772 6.55089C5.45992 5.91373 5.87533 5.34068 6.39 4.86479C6.9051 4.38669 7.50935 4.01477 8.16823 3.77026C8.82711 3.52576 9.52771 3.41346 10.23 3.43979H17.3725C18.4628 3.43594 19.5153 3.83937 20.3238 4.57104L24.0237 7.97354C24.4186 8.31364 24.7374 8.73304 24.9594 9.20447C25.1814 9.67591 25.3018 10.1888 25.3125 10.7098Z"
          stroke="#005AC2"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Smart Job Recommendations",
    text: "Smart Job recommendations that instantly connect jobs and candidates.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M24.5 26.25L16.625 18.375C16 18.875 15.2813 19.2708 14.4688 19.5625C13.6563 19.8542 12.7917 20 11.875 20C9.60417 20 7.6825 19.2133 6.11 17.64C4.5375 16.0667 3.75083 14.145 3.75 11.875C3.74917 9.605 4.53583 7.68333 6.11 6.11C7.68417 4.53667 9.60583 3.75 11.875 3.75C14.1442 3.75 16.0663 4.53667 17.6413 6.11C19.2163 7.68333 20.0025 9.605 20 11.875C20 12.7917 19.8542 13.6562 19.5625 14.4687C19.2708 15.2812 18.875 16 18.375 16.625L26.25 24.5L24.5 26.25ZM11.875 17.5C13.4375 17.5 14.7658 16.9533 15.86 15.86C16.9542 14.7667 17.5008 13.4383 17.5 11.875C17.4992 10.3117 16.9525 8.98375 15.86 7.89125C14.7675 6.79875 13.4392 6.25167 11.875 6.25C10.3108 6.24833 8.98292 6.79542 7.89125 7.89125C6.79958 8.98708 6.2525 10.315 6.25 11.875C6.2475 13.435 6.79458 14.7633 7.89125 15.86C8.98792 16.9567 10.3158 17.5033 11.875 17.5Z"
          fill="#8129CA"
        />
      </svg>
    ),
  },
  {
    title: "Instant Candidate Ranking",
    text: "Instant Candidate ranking instantly connect jobs and candidates.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path
          d="M10 20V12.5C10 11.837 10.2634 11.2011 10.7322 10.7322C11.2011 10.2634 11.837 10 12.5 10C13.163 10 13.7989 10.2634 14.2678 10.7322C14.7366 11.2011 15 11.837 15 12.5V20M10 16.25H15M20 10V20"
          stroke="#4023CB"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Sami Benali",
    role: "Software Engineer | ESTIN Graduate",
    quote:
      "Found my dream role at a top startup in days. The AI matching is a total game-changer.",
  },
  {
    name: "Reda Kasmi",
    role: "Hiring Manager at TechDz",
    quote:
      "Reduced our hiring. It finds the perfect talent before we even finish the post.",
  },
  {
    name: "Malik Ziane",
    role: "Technical Lead",
    quote:
      "Finally, a recruitment tool that actually understands my skills and career goals.",
  },
];

const Badge = ({ text }: { text: string }) => (
  <div className="inline-flex items-center rounded-xl border border-[var(--ai-border)] bg-white px-4 py-1.5 text-xs font-medium tracking-[0.03em] text-[#005ac2] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
    {text}
  </div>
);

export const HomePage = () => {
  return (
    <div className="space-y-16 pb-8">
      <section
        id="opportunities"
        className="flex flex-col items-center pt-4 text-center"
      >
        <Badge text="Opportunities" />
        <h1 className="ai-display mt-6 text-[48px] leading-[1.1] tracking-[-1px] text-[#1a1c1e] md:text-[88px] md:tracking-[-4px]">
          AI-Powered <span className="ai-gradient-text">Job</span>
          <br />
          <span className="ai-gradient-text">Matching</span> Platform
        </h1>
        <p className="mt-5 max-w-3xl text-sm text-[#44474e] md:text-xl md:leading-8">
          Instant AI-driven job and talent matching for the future of work.
          Bridge the gap between human potential and machine intelligence with
          high-fidelity neural alignments.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/jobs"
            className="rounded-md bg-gradient-to-r from-[#005ac2] to-[#6801d1] px-10 py-3 text-base font-bold text-white shadow-[0_20px_25px_-5px_rgba(0,90,194,0.2),0_8px_10px_-6px_rgba(0,90,194,0.2)]"
          >
            Find a job
          </Link>
          <Link
            to="/upload"
            className="rounded-md border border-[var(--ai-border)] bg-white px-10 py-3 text-base font-semibold text-[#1a1c1e]"
          >
            Post a job
          </Link>
        </div>
      </section>

      <section
        id="how"
        className="grid items-center gap-8 md:grid-cols-[1fr_0.95fr] md:gap-12"
      >
        <div>
          <h2 className="ai-display text-[40px] leading-[1.1] md:text-[72px]">
            How AI Job works
          </h2>
          <img
            src={imgUnderline}
            alt=""
            className="mt-2 h-8 w-[320px] max-w-full object-contain md:w-[455px]"
          />
          <p className="mt-4 max-w-xl text-xl leading-8 text-[#44474e] md:text-[32px] md:leading-[1.25]">
            Our system learns what matters to you and surfaces opportunities
            that fit. No noise, no wasted time, just the matches that count.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={imgHero}
            alt="AI job matching hero"
            className="h-auto w-full max-w-[620px] object-contain"
          />
        </div>
      </section>

      <section id="features" className="space-y-6">
        <div className="text-center">
          <Badge text="features" />
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[30px] border border-[rgba(196,198,208,0.4)] bg-[rgba(255,255,255,0.7)] px-6 py-9 shadow-[0_10px_24px_rgba(0,0,0,0.05)] backdrop-blur-[10px]"
            >
              <div className="mb-6 flex items-center justify-between">
                {feature.icon}
                <span className="rounded-[2px] bg-[rgba(0,90,194,0.1)] px-2 py-1 text-[10px] font-bold text-[#005ac2]">
                  LIVE MARKET
                </span>
              </div>
              <p className="text-[20px] font-bold text-[#1a1c1e]">
                {feature.title}
              </p>
              <p className="mt-4 text-sm leading-6 text-[#44474e]">
                {feature.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="ready"
        className="grid items-center gap-8 md:grid-cols-[1fr_0.7fr]"
      >
        <div>
          <Badge text="Ready to get started" />
          <h2 className="ai-display mt-5 text-[42px] leading-[1.08] md:text-[72px]">
            Ready to get started !
          </h2>
          <img
            src={imgUnderline}
            alt=""
            className="mt-2 h-8 w-[320px] max-w-full object-contain md:w-[455px]"
          />
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={imgReady}
            alt="Ready to start"
            className="h-auto w-full max-w-[501px] object-contain"
          />
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <button className="bg-white border border-[#cccccc] rounded-full px-4 py-1.5 text-[#333333] text-sm font-medium">
              Ready to get started
            </button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-lg shadow-[0_1px_4px_rgba(0,0,0,0.08)] p-6 w-full h-[240px] relative"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-[#5c4ec9] flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-xs">
                    👤
                  </div>
                </div>
                <div className="mt-12 text-center">
                  <p className="text-[#888888] text-sm font-normal mt-11">
                    {item.name}
                  </p>
                  <p className="text-[#aaaaaa] text-xs mt-1">{item.role}</p>
                  <div className="mt-5 text-left">
                    <span className="text-[#5b4fcf] text-2xl leading-none">
                      "
                    </span>
                    <p className="text-[#1a1a2e] text-base font-bold leading-relaxed inline ml-1">
                      {item.quote}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <footer className="bg-white border-t border-[#e5e5e5] h-14 flex justify-between items-center px-4 md:px-6 py-4 mt-16">
            <div className="text-[#4f3fe6] text-sm font-semibold">
              ai-power-job
            </div>
            <nav className="flex gap-6">
              <a href="/" className="text-[#555555] text-sm">
                Opportunities
              </a>
              <a href="#how" className="text-[#555555] text-sm">
                How
              </a>
              <a href="#features" className="text-[#555555] text-sm">
                features
              </a>
              <a href="#ready" className="text-[#555555] text-sm">
                Ready to get started
              </a>
            </nav>
          </footer>
        </div>
      </section>
    </div>
  );
};
