import {
  LuHouse,
  LuUsers,
  LuFileText,
  LuWrench,
  LuReceipt,
} from "react-icons/lu";

import { getDashboardSummary } from "@/actions/dashboard";

const formatCurrency = (value: string) => {
  const numericValue = Number(value ?? 0);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(numericValue);
};

export default async function Dashboard() {
  const summary = await getDashboardSummary();

  const stats = [
    {
      title: "Nekretnine",
      value: summary.propertyCount,
      icon: <LuHouse className="h-6 w-6" />,
      accent: "from-emerald-500 to-teal-600",
    },
    {
      title: "Stanari",
      value: summary.tenantCount,
      icon: <LuUsers className="h-6 w-6" />,
      accent: "from-cyan-500 to-sky-600",
    },
    {
      title: "Aktivni najmovi",
      value: summary.activeLeaseCount,
      icon: <LuFileText className="h-6 w-6" />,
      accent: "from-violet-500 to-indigo-600",
    },
    {
      title: "Održavanje",
      value: summary.maintenanceCount,
      icon: <LuWrench className="h-6 w-6" />,
      accent: "from-amber-500 to-orange-600",
    },
    {
      title: "Troškovi",
      value: summary.expenseCount,
      icon: <LuReceipt className="h-6 w-6" />,
      accent: "from-rose-500 to-pink-600",
    },
  ];

  return (
    <main className="space-y-8 p-6 md:p-10">
      <section className="rounded-3xl bg-gradient-to-br from-[#233b40] via-[#1b6a54] to-[#138d63] p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-100">
              Domus dashboard
            </p>
            <h1 className="text-4xl font-black tracking-tight">
              Pregled poslovanja
            </h1>
            <p className="mt-3 text-base text-emerald-50/90">
              Brzi uvid u stanje nekretnina, stanara, troškova i održavanja.
            </p>
          </div>

          <div className="grid min-w-[260px] gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-md">
            <p className="text-sm text-emerald-100">Ukupan prihod od najma</p>
            <p className="text-3xl font-black">
              {formatCurrency(summary.totalRent)}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between">
              <span
                className={`rounded-xl bg-gradient-to-br ${stat.accent} p-3 text-white`}
              >
                {stat.icon}
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-gray-400">
                Live
              </span>
            </div>
            <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold text-slate-500">
              {stat.title}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">
              Najnovije aktivnosti
            </h2>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
              Sistem
            </span>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-500">
                Aktivnih najamnih ugovora
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {summary.activeLeaseCount}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-500">
                Kasni plaćanja
              </p>
              <p className="mt-1 text-xl font-black text-rose-600">
                {summary.latePaymentCount}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-500">
                Broj zahtjeva za održavanje
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {summary.maintenanceCount}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">
            Status portfolia
          </h2>
          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>Zauzetost</span>
                <span>
                  {Math.round(
                    (summary.tenantCount / Math.max(summary.propertyCount, 1)) *
                      100,
                  )}
                  %
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                  style={{
                    width: `${Math.min(100, Math.round((summary.tenantCount / Math.max(summary.propertyCount, 1)) * 100))}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-600">
                <span>Upravljački fokus</span>
                <span>{summary.maintenanceCount > 0 ? "Aktivno" : "Sati"}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                  style={{
                    width: `${Math.min(100, summary.maintenanceCount * 10)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
