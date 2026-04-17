interface SkillChipProps {
  label: string;
}

export const SkillChip = ({ label }: SkillChipProps) => {
  return (
    <span className="rounded-full border border-[#26a4ff]/25 bg-[#26a4ff]/10 px-3 py-1 text-xs font-semibold text-[#1e6ea9]">
      {label}
    </span>
  );
};
