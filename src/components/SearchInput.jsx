import "../styles/searchinput.css";

function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return (
    <input
      type="text"
      className="search-input"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default SearchInput;