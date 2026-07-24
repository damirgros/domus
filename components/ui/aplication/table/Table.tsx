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
  return (
    <table className="w-full">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={String(column.key)}
              className="border-y-4 border-gray-200 rounded-xl p-5 text-start text-gray-500 font-bold uppercase"
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
                    className="border-y-4 border-gray-200 rounded-xl p-5"
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
                    className="border-y-4 border-gray-200 rounded-xl p-5 font-bold"
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key])}
                  </td>
                ))}
              </tr>
            ))}
      </tbody>
    </table>
  );
}
