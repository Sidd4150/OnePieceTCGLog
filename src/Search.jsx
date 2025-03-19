import { useState } from "react";
import "./Search.css"
function Search({ onFilterChange, onSearch }) {
    const [searchTerm, setSearchTerm] = useState(""); // State to hold search term

    const handleSelectChange = (event) => {
        onFilterChange(event.target.value); // Pass selected filter value to the parent
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value); // Update the search term state on input change
    };

    const handleSearchClick = () => {
        onSearch(searchTerm); // Pass the search term to the parent when search button is clicked
    };

    return (
        <div className="search_cards">
            <input
                type="text"
                className="SearchBar"
                placeholder="Type Card Name ex: Luffy"
                value={searchTerm} // Bind input value to the searchTerm state
                onChange={handleSearchChange} // Update searchTerm when input changes
            />
            <button onClick={handleSearchClick}>Search</button>

            <select className="Filter" onChange={handleSelectChange}>
                <option value="">Filter</option>
                <option value="price">Price Descending</option>
                <option value="priceASC">Price Ascending (Bugs)</option>
                <option value="setNameDESC">Set Descending</option>
                <option value="setNameASC">Set Ascending (Bugs)</option>
                <option value="reset">Reset</option>
            </select>
        </div>
    );
}

export default Search;
