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
    <div className="flex items-center justify-center gap-2 p-5 font-bold">
      <button
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className={`border-2 rounded-xl px-3 py-2 ${page === 1 ? "border-gray-200 text-gray-200" : "text-white bg-[#138d63]"}`}
      >
        Prethodna
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className={`border-2 rounded-xl px-3 py-2 ${page === totalPages ? "border-gray-200 text-gray-200" : "text-white bg-[#138d63]"}`}
      >
        Sljedeća
      </button>
    </div>
  );
}
