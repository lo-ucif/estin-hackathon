import type { PropsWithChildren } from "react";
import { Navbar } from "../components/Navbar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f5f5f5] text-slate-900">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#26a4ff]/30 to-[#7c3aed]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-72 w-72 rounded-full bg-gradient-to-br from-[#26a4ff]/20 to-[#7c3aed]/30 blur-3xl" />
      <div className="mx-auto flex min-h-screen max-w-[1200px] flex-col px-4 pb-8 pt-6 md:px-6">
        <Navbar />
        <main className="mt-6 flex-1">{children}</main>
      </div>
    </div>
  );
};
