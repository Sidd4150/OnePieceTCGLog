import "./Nav.css"

export default function Nav() {

    return (
        <nav className="Nav" >
            <img className="Logo" src="src/assets/LogPoseLogo.jpeg" alt="Logo"></img>
            <h1 className="header_text"> One piece TCG Card List </h1>
            <ul className="pages">
                <li> <a href="#">Home</a></li>
                <li> <a href="#">About</a></li>

            </ul>

        </nav >
    )
}