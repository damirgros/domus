import { getDashboardSummary } from "@/actions/dashboard";
import formatDate from "@/utils/format-date";

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

  const occupancy = Math.min(
    100,
    Math.round(
      (summary.tenantCount / Math.max(summary.propertyCount, 1)) * 100,
    ),
  );
  const maintenanceFocus = Math.min(100, summary.maintenanceCount * 10);

  return (
    <main className="space-y-8 p-10">
      <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Pregled poslovanja
          </h1>
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

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-xl border-4 border-gray-200 bg-white p-6">
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

        <article className="rounded-xl border-4 border-gray-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-gray-900">Status portfolia</h2>
          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-bold text-gray-500">
                <span>Zauzetost</span>
                <span>{occupancy}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-[#138d63]"
                  style={{ width: `${occupancy}%` }}
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm font-bold text-gray-500">
                <span>Upravljački fokus</span>
                <span>
                  {summary.maintenanceCount > 0 ? "Aktivno" : "Mirno"}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gray-900"
                  style={{ width: `${maintenanceFocus}%` }}
                />
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
