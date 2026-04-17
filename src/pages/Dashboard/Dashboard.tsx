type Transaction = {
  date: string;
  hours: string;
  currency: string;
  location: string;
  bank: string;
  amount: string;
  note: string;
  status: string;
};

const transactions: Transaction[] = Array.from({ length: 10 }, (_, index) => ({
  date: 'Jun 24, 2026',
  hours: '18:00:00',
  currency: 'DZD',
  location: 'estin bejaya',
  bank: 'CBN',
  amount: '$942.00',
  note: `faf fzhf ifhz oijoa  fzio... ${index + 1}`,
  status: 'food',
}));

const menuItemClass =
  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-black/80 transition-colors hover:bg-black/5';

const sectionLabelClass = 'px-3 py-1 text-sm text-black/40';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] p-3 md:p-5">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 md:h-[calc(100vh-40px)] md:flex-row">
        <aside className="relative flex w-full shrink-0 flex-col gap-10 rounded-[30px] bg-white p-4 md:w-[268px]">
          <div className="space-y-8">
            <div className="space-y-1 pb-2">
              <div className="flex items-center gap-2 rounded-lg px-2 py-2">
                <div className="flex size-7 items-center justify-center rounded-md bg-black text-xs font-semibold text-white">
                  14
                </div>
                <p className="text-sm text-black">theme</p>
              </div>
            </div>

            <div className="space-y-1 pb-1">
              <p className={sectionLabelClass}>Dashboards</p>
              <button type="button" className={`${menuItemClass} bg-black/5`}>
                <span className="inline-block size-4 rounded-sm bg-black" />
                Dashboards
              </button>
              <button type="button" className={menuItemClass}>
                <span className="inline-block size-4 rounded-sm border border-black/60" />
                Analytics
              </button>
            </div>

            <div className="space-y-1 pb-2">
              <p className={sectionLabelClass}>setting</p>
              <button type="button" className={menuItemClass}>
                <span className="inline-block size-4 rounded-full border border-black/60" />
                settings
              </button>
              <button type="button" className={menuItemClass}>
                <span className="inline-block size-4 rounded-sm bg-black/80" />
                log out
              </button>
            </div>
          </div>

          <div className="mt-auto rounded-lg p-2 backdrop-blur-md">
            <div className="mx-auto flex w-fit items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-md bg-black text-xs font-semibold text-white">
                14
              </div>
              <p className="text-sm text-black">theme</p>
            </div>
          </div>
        </aside>

        <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[30px] bg-white p-2.5">
          <header className="flex flex-col gap-3 border-b border-black/10 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-7">
            <div>
              <p className="text-sm font-semibold text-black">Welcome, Ahmed!</p>
              <p className="text-xs text-black/40">
                Manage your DZD finances with smart automation
              </p>
            </div>

            <div className="flex items-center gap-3 md:gap-5">
              <div className="flex h-8 w-full items-center justify-between rounded-2xl bg-black/4 px-3 md:w-40">
                <span className="text-sm text-black/20">Search</span>
                <span className="rounded border border-black/10 px-1 text-xs text-black/20">/</span>
              </div>
              <button
                type="button"
                className="flex size-6 items-center justify-center rounded-full text-black/70"
              >
                °
              </button>
              <div className="flex items-center gap-2">
                <div className="size-6 rounded-full bg-black/10" />
                <span className="text-sm text-black">sebti</span>
              </div>
            </div>
          </header>

          <div className="mt-2.5 min-h-0 flex-1 overflow-auto rounded-3xl bg-[#f9f9fa] p-4 shadow-[0px_0.5px_0.5px_0px_rgba(0,0,0,0.1)] md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1d6c67]">Projects</h2>
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-2xl bg-black/4 text-black/70"
              >
                ...
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl">
              <div className="min-w-[880px]">
                <table className="w-full border-separate border-spacing-y-1 text-sm">
                  <thead>
                    <tr className="text-left text-xs text-black/40">
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Hours</th>
                      <th className="px-4 py-2">currency</th>
                      <th className="px-4 py-2">location</th>
                      <th className="px-4 py-2">bank_name</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">original text</th>
                      <th className="px-4 py-2 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={`${transaction.date}-${index}`} className="bg-black/[0.02]">
                        <td className="rounded-l-2xl px-4 py-3">{transaction.date}</td>
                        <td className="px-4 py-3">{transaction.hours}</td>
                        <td className="px-4 py-3">{transaction.currency}</td>
                        <td className="px-4 py-3">{transaction.location}</td>
                        <td className="px-4 py-3">{transaction.bank}</td>
                        <td className="px-4 py-3">{transaction.amount}</td>
                        <td className="max-w-[180px] truncate px-4 py-3 text-xs">{transaction.note}</td>
                        <td className="rounded-r-2xl px-4 py-3 text-center">
                          <span className="rounded-full bg-[#b899eb]/10 px-3 py-1 text-xs text-[#b899eb]">
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
