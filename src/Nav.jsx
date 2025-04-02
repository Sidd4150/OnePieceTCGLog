import "./Nav.css"

export default function Nav() {

    return (
        <nav className="Nav" >
            <img className="Logo" src="/assets/newLogo.png" alt="Logo"></img>

            <ul className="pages">
                <li> <p className="Home" >Home</p></li>

                <li> <p className="about" >About</p></li>


            </ul>

        </nav >
    )
}