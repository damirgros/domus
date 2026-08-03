import type { Column } from "@/types/column";

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  skeletonRows?: number;
};

export default function Table<T>({
  data,
  columns,
  onRowClick,
  isLoading = false,
  skeletonRows = 5,
}: TableProps<T>) {
  const renderCell = (row: T, column: Column<T>) => {
    if (column.render) {
      return column.render(row[column.key], row);
    }

    return String(row[column.key]);
  };

  return (
    <div className="w-full">
      <div className="block space-y-3 p-4 md:hidden">
        {isLoading
          ? Array.from({ length: skeletonRows }).map((_, index) => (
              <div
                key={`skeleton-card-${index}`}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="mt-3 space-y-2">
                  {columns.slice(0, 3).map((column) => (
                    <div
                      key={`${String(column.key)}-card-${index}`}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                      <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              </div>
            ))
          : data.map((row, index) => (
              <button
                key={`row-card-${index}`}
                type="button"
                onClick={() => onRowClick?.(row)}
                className={`w-full rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm ${onRowClick ? "cursor-pointer hover:bg-gray-50" : undefined}`}
              >
                {columns.map((column) => (
                  <div
                    key={String(column.key)}
                    className="flex items-start justify-between gap-3 py-1 text-sm"
                  >
                    <span className="font-semibold text-gray-500">
                      {column.title}
                    </span>
                    <span className="max-w-[60%] text-right font-bold text-gray-900 overflow-hidden">
                      {renderCell(row, column)}
                    </span>
                  </div>
                ))}
              </button>
            ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[720px]">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="rounded-xl border-y-4 border-gray-200 p-5 text-start font-bold uppercase text-gray-500"
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading
              ? Array.from({ length: skeletonRows }).map((_, index) => (
                  <tr key={`skeleton-${index}`}>
                    {columns.map((column) => (
                      <td
                        key={`${String(column.key)}-skeleton-${index}`}
                        className="rounded-xl border-y-4 border-gray-200 p-5"
                      >
                        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                      </td>
                    ))}
                  </tr>
                ))
              : data.map((row, index) => (
                  <tr
                    key={index}
                    onClick={() => onRowClick?.(row)}
                    className={
                      onRowClick ? "cursor-pointer hover:bg-gray-50" : undefined
                    }
                  >
                    {columns.map((column) => (
                      <td
                        key={String(column.key)}
                        className="rounded-xl border-y-4 border-gray-200 p-5 font-bold"
                      >
                        {renderCell(row, column)}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
