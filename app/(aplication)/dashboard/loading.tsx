function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

export default function DashboardLoading() {
  return (
    <main
      className="space-y-8 p-10"
      aria-busy="true"
      aria-label="Učitavanje nadzorne ploče"
    >
      <section className="flex flex-col gap-6 border-b-4 border-gray-200 pb-8">
        <Skeleton className="h-10 w-80" />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }).map((_, index) => (
          <article
            key={index}
            className="rounded-xl border-4 border-gray-200 bg-white p-5"
          >
            <Skeleton className="h-9 w-32" />
            <Skeleton className="mt-3 h-4 w-24" />
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <article className="rounded-xl border-4 border-gray-200 bg-white p-6">
          <Skeleton className="h-8 w-48" />
          <div className="mt-5 space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border-2 border-gray-200 px-4 py-3"
              >
                <div>
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="mt-2 h-4 w-28" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border-4 border-gray-200 bg-white p-6">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="mt-2 h-4 w-40" />
          <Skeleton className="mt-6 h-64 w-full" />
        </article>
      </section>
    </main>
  );
}
