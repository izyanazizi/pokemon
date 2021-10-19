import "./Style.css";

function Navbar(params) {
  return(
    <div className= "header">
      <a href="#App" className= "main-header">Pokemon</a>
      <div className= "header-buttom">
        <a href="#home">Home</a>
        <a href="#my-poke">My Pokemon</a>
      </div>
    </div>
  )
}

export default Navbar;