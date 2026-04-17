import { useRef } from "react";

interface UploadBoxProps {
  onFileSelected: (fileName: string) => void;
}

export const UploadBox = ({ onFileSelected }: UploadBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onFileSelected(file.name);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group relative flex w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[#26a4ff]/35 bg-white px-6 py-12 text-center shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition hover:border-[#26a4ff] hover:bg-[#26a4ff]/5"
    >
      <div className="mb-4 rounded-2xl bg-gradient-to-r from-[#26a4ff] to-[#7c3aed] p-3 text-white shadow-lg">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 16V4M12 4L7.5 8.5M12 4L16.5 8.5M5 16.5V18.5C5 19.6 5.9 20.5 7 20.5H17C18.1 20.5 19 19.6 19 18.5V16.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <p className="text-xl font-bold text-[#25324b]">Upload your CV</p>
      <p className="mt-2 text-sm text-slate-500">Drag & drop your file or browse</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleChange}
      />
    </button>
  );
};
