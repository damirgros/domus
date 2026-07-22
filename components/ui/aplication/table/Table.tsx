import type { Column } from "@/types/column";

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

export default function Table<T>({ data, columns }: TableProps<T>) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)} className="border-b p-3 text-left">
              {column.title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={String(column.key)} className="border-b p-3">
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
