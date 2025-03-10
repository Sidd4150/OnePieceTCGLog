



function Search({ onFilterChange }) {
    const handleSelectChange = (event) => {
        onFilterChange(event.target.value); // Pass selected filter value to the parent
    };

    return (
        <div className="search_cards">

            <input type="text" className="SearchBar" placeholder="Type Card Name" />
            <button>Search</button>
            <select className="Filter" onChange={handleSelectChange}>
                <option value="">Filter</option>
                <option value="price">Price Descending</option>
                <option value="setName">Set Descending</option>
                <option value="reset">Reset</option>
            </select>

        </div>
    )
}

export default Search