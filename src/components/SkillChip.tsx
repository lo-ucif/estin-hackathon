interface SkillChipProps {
  label: string;
}

export const SkillChip = ({ label }: SkillChipProps) => {
  return (
    <span className="rounded-full border border-[#005ac2]/25 bg-[#005ac2]/10 px-3 py-1 text-xs font-semibold text-[#005ac2]">
      {label}
    </span>
  );
};
