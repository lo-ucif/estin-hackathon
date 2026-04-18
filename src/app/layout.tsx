import type { PropsWithChildren } from "react";
import { Navbar } from "../components/Navbar";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f5f5] text-[#1a1c1e]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1280px] flex-col">
        <Navbar />
        <main className="flex-1 px-4 pt-28 pb-6 md:px-6">{children}</main>
      </div>
    </div>
  );
};
