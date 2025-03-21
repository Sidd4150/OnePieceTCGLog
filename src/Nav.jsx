import "./Nav.css"

export default function Nav() {

    return (
        <nav className="Nav" >
            <img className="Logo" src="public/assets/newLogo.png" alt="Logo"></img>
            <ul className="pages">
                <li> <a href="#">Home</a></li>
                <li> <a href="#">About</a></li>

            </ul>

        </nav >
    )
}