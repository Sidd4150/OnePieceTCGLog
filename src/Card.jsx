import PropTypes from 'prop-types';
import { useState, useEffect } from "react";


function Card({ name = "NO card to display", img = "EK.jpeg", price = "No Data" }) {
    const [expanded, setExpanded] = useState(false);

    const handleClick = () => {
        setExpanded(!expanded);
    };


    return (
        <div className={`card ${expanded ? "expanded" : ""}`} onClick={handleClick}>
            <img className="cardImg" src={img} alt={name} />
            <h2 className="card_title">{name}</h2>
            <p>Market Price: ${price}</p>
        </div>
    );
}


// Prop types validation
Card.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
};

export default Card;
