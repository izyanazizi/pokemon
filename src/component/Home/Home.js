import React from "react";
import typeColors from "../../Helpers/typeColors";
import './style.css';

function Home({ pokemon }) {
  return(
    <div className ="card">
      <div className ="card-img">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <div className ="card-name">
        {pokemon.name}
      </div>
      <div className ="card-types">
        {pokemon.types.map(type => {
          return(
            <div className="card-type" style={{ backgroundColor: typeColors[type.type.name] }}>
              {type.type.name}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Home;