import { getDashboardSummary } from "@/actions/dashboard";
import formatDate from "@/utils/format-date";
import IncomeChart from "@/components/ui/aplication/charts/IncomeChart";
import formatCurrency from "@/utils/format-currency";

export default async function Dashboard() {
  const summary = await getDashboardSummary();

  const stats = [
    {
      title: "Nekretnine",
      value: summary.propertyCount,
    },
    {
      title: "Aktivni najmovi",
      value: summary.activeLeaseCount,
    },
    {
      title: "Prihod",
      value: formatCurrency(summary.totalRent),
      valueClass: "text-[#138d63]",
    },
    {
      title: "Troškovi",
      value: formatCurrency(summary.totalExpenses),
      valueClass: "text-red-600",
    },
    {
      title: "Profit",
      value: formatCurrency(
        Number(summary.totalRent) - Number(summary.totalExpenses),
      ),
    },
  ];

  return (
    <main className="space-y-8 p-4 sm:p-6 lg:p-10">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Pregled</h1>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {stats.map((stat) => (
          <article
            key={stat.title}
            className="rounded-xl border-4 border-gray-200 bg-white p-5"
          >
            <p
              className={`text-3xl font-bold ${stat.valueClass ?? "text-gray-900"}`}
            >
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-wide text-gray-500">
              {stat.title}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 px-0 lg:grid-cols-[1fr_1fr]">
        <article className="overflow-hidden rounded-xl border-4 border-gray-200 bg-white p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900">Istek najmova</h2>
          <div className="mt-5 space-y-3">
            {summary.expiringLeases.length > 0 ? (
              summary.expiringLeases.map((lease) => (
                <div
                  key={lease.id}
                  className="flex items-center justify-between rounded-lg border-2 border-gray-200 px-4 py-3"
                >
                  <div>
                    <p className="font-bold text-gray-900">
                      {lease.tenant.fullName}
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-500">
                      {lease.property.name}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-gray-500">
                    {lease.endDate ? formatDate(lease.endDate) : "-"}
                  </p>
                </div>
              ))
            ) : (
              <p className="py-4 font-bold text-gray-500">
                Nema najmova s definiranim datumom isteka.
              </p>
            )}
          </div>
        </article>

        <article className="overflow-hidden rounded-xl border-4 border-gray-200 bg-white p-4 sm:p-6">
          <h2 className="text-2xl font-bold text-gray-900">Prihod</h2>
          <span className="text-gray-400">U zadnjih 6 mjeseci</span>
          <div className="mt-6 h-full w-full overflow-hidden">
            <IncomeChart />
          </div>
        </article>
      </section>
    </main>
  );
}
