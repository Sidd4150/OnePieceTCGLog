import Header from "./Header.jsx"
import Card from "./Card.jsx"
import Nav from "./Nav.jsx"
import Search from "./Search.jsx"
import Captain_Kid from "./assets/EKH.png"
import './index.css'

export default function App() {
  return (
    <>
      <Header />
      <Nav />
      <Search />
      <div className="card_area">
        <Card img={Captain_Kid} name="Captain Kid" />
        <Card />
        <Card />
        <Card />

      </div>
    </>
  )
}