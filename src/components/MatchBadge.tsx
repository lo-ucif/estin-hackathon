interface MatchBadgeProps {
  percent: number;
}

export const MatchBadge = ({ percent }: MatchBadgeProps) => {
  const tone =
    percent >= 90
      ? "from-[#005ac2] to-[#00dce5]"
      : percent >= 80
        ? "from-[#005ac2] to-[#6801d1]"
        : "from-[#6801d1] to-[#8b5cf6]";

  return (
    <span
      className={`inline-flex items-center rounded-full bg-gradient-to-r ${tone} px-3 py-1 text-xs font-bold text-white shadow`}
    >
      {percent}%
    </span>
  );
};
