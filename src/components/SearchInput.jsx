import "../styles/searchinput.css";

function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) {
  return (
    <input
      type="text"
      className={`search-input ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default SearchInput;