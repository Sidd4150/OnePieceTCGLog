import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Card from "./Card.jsx";
import Nav from "./Nav.jsx";
import Search from "./Search.jsx";
import "./index.css";

export default function App() {
  const [cards, setCards] = useState([]); // State to store fetched cards
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    fetch("https://onepiecetcglog-production.up.railway.app/api/cards") // Update with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setCards(data.cards); // Access the 'cards' property of the response
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []);

  if (loading) {
    return <p>Loading cards...</p>; // Show loading text while data is fetching
  }
  const handleFilterChange = (selectedFilter) => {
    setLoading(true); // Set loading true to show loading state while fetching filtered data

    // Send the selected filter to the backend as a query parameter
    fetch(`https://onepiecetcglog-production.up.railway.app/api/filter?filter=${selectedFilter}`)
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
    fetch(`https://onepiecetcglog-production.up.railway.app/api/search?filter=${searchTerm}`)
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
      <div className="background" >

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
        <div className="card_area">
          {cards.length > 0 ? (
            cards.map((card, index) => (
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
