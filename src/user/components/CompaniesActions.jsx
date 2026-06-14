import ActionButton from "./ActionButton";
import SearchInput from "./SearchInput";
import "../styles/companiesactions.css";

function CompaniesActions({
  searchValue,
  setSearchValue,
  onExportClick
}) {
  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  return (
    <div className="companies-actions">
      <div className="companies-left-actions">
        <SearchInput
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search companies..."
        />
      </div>

      {/* <ActionButton>Filter</ActionButton> */}
      {/* <ActionButton>Sort</ActionButton> */}
       
        <div className="companies-right-actions">
        <ActionButton onClick={onExportClick}>Export to Excel</ActionButton>
      </div>
      
    </div>
    
  );
}

export default CompaniesActions;