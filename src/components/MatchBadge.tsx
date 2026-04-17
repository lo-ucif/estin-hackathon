interface MatchBadgeProps {
  percent: number;
}

export const MatchBadge = ({ percent }: MatchBadgeProps) => {
  const tone =
    percent >= 90
      ? "from-emerald-500 to-cyan-500"
      : percent >= 80
        ? "from-[#26a4ff] to-[#7c3aed]"
        : "from-amber-500 to-orange-500";

  return (
    <span
      className={`inline-flex items-center rounded-full bg-gradient-to-r ${tone} px-3 py-1 text-xs font-bold text-white shadow`}
    >
      {percent}%
    </span>
  );
};
