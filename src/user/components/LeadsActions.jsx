import ActionButton from "./ActionButton";
import SearchInput from "./SearchInput";
import "../styles/leadsactions.css";

function LeadsActions({
  searchValue,
  setSearchValue,
  onExportClick
}) {
  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  return (
    <div className="leads-actions">
      <div className="leads-left-actions">
        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search leads..."
        />
      </div>
       <div className="leads-right-actions">

      <ActionButton onClick={onExportClick}>Export to Excel</ActionButton>
      </div>
    </div>
  );
}

export default LeadsActions;