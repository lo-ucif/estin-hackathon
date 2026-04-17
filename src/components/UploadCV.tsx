import { useState, type ChangeEvent } from "react";

type UploadCVProps = {
  resumeText: string;
  onResumeChange: (value: string) => void;
};

export const UploadCV = ({ resumeText, onResumeChange }: UploadCVProps) => {
  const [status, setStatus] = useState(
    "Paste your experience or upload a .txt resume file.",
  );

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      setStatus(
        "Please upload a plain text (.txt) file for the best experience.",
      );
      return;
    }

    const text = await file.text();
    onResumeChange(text);
    setStatus("Resume loaded successfully.");
  };

  return (
    <section
      id="upload"
      className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">Upload your CV</p>
          <p className="mt-1 text-sm text-slate-500">
            Drop a resume or type your skills to generate matches instantly.
          </p>
        </div>
        <label className="inline-flex cursor-pointer items-center rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
          Upload .txt file
          <input
            className="hidden"
            type="file"
            accept=".txt"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <textarea
        className="mt-6 min-h-[220px] w-full resize-none rounded-[28px] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-900 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
        value={resumeText}
        onChange={(event) => onResumeChange(event.target.value)}
        placeholder="Example: React, TypeScript, UI development, Tailwind, REST APIs..."
      />
      <p className="mt-3 text-sm text-slate-500">{status}</p>
    </section>
  );
};
