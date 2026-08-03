type SearchBarProps = {
  value: string;
  handleChange: (value: string) => void;
  placeholder: string;
  selectedProperty: string | "";
  handleSelectedProperty: (value: string) => void;
  handlePageChange: (value: number) => void;
  properties: string[];
};

export default function SearchBar({
  value,
  handleChange,
  placeholder,
  selectedProperty,
  handleSelectedProperty,
  handlePageChange,
  properties,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 bg-[#233b40] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <search className="w-full sm:max-w-md">
        <input
          type="search"
          placeholder={placeholder}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          className="w-full rounded-xl border-2 border-[#138d63] bg-white/10 px-4 py-2.5 text-sm font-semibold text-[#f5f5f5] placeholder:text-[#99a7aa] outline-none ring-0 focus:border-[#2fd18f]"
        />
      </search>
      <select
        value={selectedProperty}
        onChange={(e) => {
          handleSelectedProperty(e.target.value);
          handlePageChange(1);
        }}
        className="w-full rounded-xl border-2 border-[#138d63] bg-white/10 px-4 py-2.5 text-sm font-semibold text-[#f5f5f5] sm:w-56"
      >
        <option value="">Sve nekretnine</option>

        {properties.map((property) => (
          <option key={property} value={property}>
            {property}
          </option>
        ))}
      </select>
    </div>
  );
}
