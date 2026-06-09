import ActionButton from "./ActionButton";
import SearchInput from "./SearchInput";
import "../styles/leadsactions.css";

function LeadsActions({
  searchValue,
  onSearchChange,
  onFilterClick,
  onExportClick,
}) {
  return (
    <div className="leads-actions">
      <div className="leads-left-actions">
        <ActionButton onClick={onFilterClick}>Filter</ActionButton>

        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search First, Last or Company..."
          className="leads-search-input"
        />
      </div>

      <div className="leads-right-actions">
        <ActionButton onClick={onExportClick}>Export to Excel</ActionButton>
      </div>
    </div>
  );
}

export default LeadsActions;