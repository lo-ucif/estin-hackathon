type MatchCardProps = {
  match: {
    job: {
      id: string;
      title: string;
      company: string;
      location: string;
    };
    score: number;
  };
};

export const MatchCard = ({ match }: MatchCardProps) => {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">
            {match.job.title}
          </p>
          <p className="mt-1 text-sm text-slate-500">{match.job.company}</p>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-sm font-semibold text-white">
          {match.score}%
        </span>
      </div>
      <p className="mt-3 text-sm text-slate-500">{match.job.location}</p>
    </div>
  );
};
