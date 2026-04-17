import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SkillChip } from "../../components/SkillChip";
import { UploadBox } from "../../components/UploadBox";
import type { CvAnalysisResult } from "../../types";

const mockSkills = ["React", "Node.js", "SQL", "TypeScript", "Docker", "REST API"];

export const UploadPage = () => {
  const [fileName, setFileName] = useState("");
  const [analysis, setAnalysis] = useState<CvAnalysisResult>({
    processing: false,
    progress: 0,
    extractedSkills: [],
  });

  useEffect(() => {
    if (!analysis.processing) return;

    if (analysis.progress >= 100) {
      setAnalysis((current) => ({
        ...current,
        processing: false,
        extractedSkills: mockSkills,
      }));
      return;
    }

    const timer = window.setTimeout(() => {
      setAnalysis((current) => ({
        ...current,
        progress: Math.min(current.progress + 18, 100),
      }));
    }, 350);

    return () => window.clearTimeout(timer);
  }, [analysis.processing, analysis.progress]);

  const startAnalysis = (selectedFileName: string) => {
    setFileName(selectedFileName);
    setAnalysis({
      processing: true,
      progress: 10,
      extractedSkills: [],
    });
  };

  const ready = useMemo(
    () => !analysis.processing && analysis.extractedSkills.length > 0,
    [analysis.processing, analysis.extractedSkills.length],
  );

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/50 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
        <h1 className="text-3xl font-bold text-[#25324b]">Upload CV</h1>
        <p className="mt-2 text-sm text-slate-500">
          Simulate AI-powered CV understanding and instant job matching.
        </p>

        <div className="mt-6">
          <UploadBox onFileSelected={startAnalysis} />
          {fileName ? <p className="mt-3 text-sm text-slate-500">Selected: {fileName}</p> : null}
        </div>
      </section>

      <section className="rounded-3xl border border-white/50 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          AI Processing
        </p>
        <h2 className="mt-2 text-xl font-bold text-[#25324b]">Analyzing your CV...</h2>
        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#26a4ff] to-[#7c3aed] transition-all duration-300"
            style={{ width: `${analysis.progress}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-slate-500">{analysis.progress}% complete</p>
      </section>

      <section className="rounded-3xl border border-white/50 bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.07)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
          Results
        </p>
        <h2 className="mt-2 text-xl font-bold text-[#25324b]">Extracted Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {(ready ? analysis.extractedSkills : mockSkills).map((skill) => (
            <SkillChip key={skill} label={skill} />
          ))}
        </div>

        <Link
          to="/jobs"
          className="mt-6 inline-flex items-center rounded-xl bg-gradient-to-r from-[#26a4ff] to-[#7c3aed] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(38,164,255,0.35)]"
        >
          See Matching Jobs
        </Link>
      </section>
    </div>
  );
};
