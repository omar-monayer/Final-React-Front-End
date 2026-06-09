import ActionButton from "./ActionButton";
import SearchInput from "./SearchInput";
import "../styles/companiesactions.css";

function CompaniesActions({
  searchValue,
  onSearchChange,
  onFilterClick,
  onExportClick,
}) {
  return (
    <div className="companies-actions">
      <div className="companies-left-actions">
        <ActionButton onClick={onFilterClick}>Filter</ActionButton>

        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search Company..."
        />
      </div>

      <div className="companies-right-actions">
        <ActionButton onClick={onExportClick}>Export to Excel</ActionButton>
      </div>
    </div>
  );
}

export default CompaniesActions;