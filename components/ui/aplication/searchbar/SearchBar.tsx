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
    <div className="flex justify-between p-5">
      <search>
        <input
          type="search"
          placeholder={`${placeholder}`}
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          className="border-2 border-gray-200 rounded-xl px-5 py-2"
        />
      </search>
      <select
        value={selectedProperty}
        onChange={(e) => {
          handleSelectedProperty(e.target.value);
          handlePageChange(1);
        }}
        className="border-2 border-gray-200 rounded-xl px-5 py-2 text-gray-400 font-bold"
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
