import PropTypes from 'prop-types';

function Card({ name = "NO card to display", img = "EK.jpeg" }) {
    return (
        <div className="card">
            <img className="cardImg" src={img} alt={name}></img>
            <h2 className="card_title">{name}</h2>
        </div>
    );
}


// Prop types validation
Card.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired
};

export default Card;
