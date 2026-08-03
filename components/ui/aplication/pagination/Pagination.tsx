type PaginationProps = {
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

export default function Pagination({
  page,
  totalPages,
  handlePageChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-3 p-4 font-bold sm:flex-row sm:items-center sm:justify-center sm:gap-2 sm:p-5">
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className={`w-full rounded-xl border-2 px-4 py-2 text-sm sm:w-auto ${page === 1 ? "border-gray-200 text-gray-200" : "bg-[#138d63] text-white"}`}
      >
        Prethodna
      </button>

      <span className="text-center text-sm text-gray-600 sm:text-base">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className={`w-full rounded-xl border-2 px-4 py-2 text-sm sm:w-auto ${page === totalPages ? "border-gray-200 text-gray-200" : "bg-[#138d63] text-white"}`}
      >
        Sljedeća
      </button>
    </div>
  );
}
