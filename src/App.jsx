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
    fetch("http://localhost:8000/api/cards") // Update with your backend URL
      .then((response) => response.json())
      .then((data) => {
        setCards(data.cards); // Access the 'cards' property of the response
        setLoading(false); // Set loading to false once data is fetched
      });
  }, []);

  if (loading) {
    return <p>Loading cards...</p>; // Show loading text while data is fetching
  }



  return (
    <>
      <Header />
      <Nav />
      <Search />
      <div className="card_area">
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <Card key={index} img={card.img} name={card.name} price={card.price} />
          ))
        ) : (
          <p>No cards available</p> // Display this if no cards are in the database
        )}
      </div>
    </>
  );
}
