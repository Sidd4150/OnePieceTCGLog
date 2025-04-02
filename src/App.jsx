import { useState, useEffect } from "react";

import Card from "./Card.jsx";
import Nav from "./Nav.jsx";
import Search from "./Search.jsx";
import "./index.css";

let url = "https://optcglogbackend-production.up.railway.app"
//url = "http://127.0.0.1:8000"

export default function App() {
  const [cards, setCards] = useState([]); // State to store fetched cards
  const [loading, setLoading] = useState(true); // State for loading status
  const [currentPage, setCurrentPage] = useState(1); //currect page State
  const cardsPerPage = 25;  //Number of cards per page

  const totalPages = Math.ceil(cards.length / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + cardsPerPage);

  useEffect(() => {
    fetch(`${url}/api/cards`)
      .then((response) => response.json())
      .then((data) => {
        setCards(data.cards); // Access the 'cards' property of the response
        setLoading(false); // 
      });
  }, []);

  if (loading) {
    return <p>Loading cards...</p>; // Show loading text while data is fetching
  }
  const handleFilterChange = (selectedFilter) => {
    setLoading(true); // Set loading true to show loading state while fetching filtered data

    // Send the selected filter to the backend as a query parameter
    fetch(`${url}/api/filter?filter=${selectedFilter}`)
      .then((response) => response.json())
      .then((data) => {
        setCards(data.cards); // Update the cards with the filtered data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching filtered cards:", error);
        setLoading(false); // Set loading to false even in case of an error
      });
  };
  const handleSearch = (searchTerm) => {
    setLoading(true); // Set loading true to show loading state while fetching filtered data

    // Send the selected filter to the backend as a query parameter
    fetch(`${url}/api/search?filter=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setCards(data.cards); // Update the cards with the filtered data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching filtered cards:", error);
        setLoading(false); // Set loading to false even in case of an error
      });
  };



  return (
    <>

      <div className="header_area">
        <Nav />
        <br />
        <br />
        <br />
        <br />
        <Search onFilterChange={handleFilterChange} onSearch={handleSearch} />
        <br />
        <br />
        <br />
        <br />
      </div>



      <div className="background" >

        <div className="pagination_controls">
          <button
            className="Prevbtn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            className="Nextbtn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        <div className="card_area">
          {currentCards.length > 0 ? (
            currentCards.map((card, index) => (
              <Card key={index} img={card.img} name={card.name} price={card.price} />
            ))
          ) : (
            <p>No cards available</p> // Display this if no cards are in the database
          )}

        </div>
      </div>
    </>
  );
}
