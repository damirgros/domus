type SearchBarProps = {
  value: string;
  handleChange: (value: string) => void;
  placeholder: string;
};

export default function SearchBar({
  value,
  handleChange,
  placeholder,
}: SearchBarProps) {
  return (
    <search>
      <input
        type="search"
        placeholder={`${placeholder}`}
        onChange={(e) => handleChange(e.target.value)}
        value={value}
      />
    </search>
  );
}
