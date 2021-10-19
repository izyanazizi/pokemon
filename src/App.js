import React, { useState, useEffect } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './services/pokemon';
import Navbar from './component/Navbar/Navbar';
import Home from './component/Home/Home';

function App() {
  const [pokemonData, setpokemonData] = useState([]);
  const [nextUrl, setnextUrl] = useState('');
  const [prevUrl, setprevUrl] = useState('');
  const [loading, setloading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon/'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setnextUrl(response.next);
      setprevUrl(response.previous);
      await loadingPokemon(response.results);
      setloading(false);
    }
    fetchData();
  })

  const next = async () => {
    setloading(true);
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results)
    setnextUrl(data.next);
    setprevUrl(data.previous);
    setloading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setloading(true);
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results)
    setnextUrl(data.next);
    setprevUrl(data.previous);
    setloading(false);
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    }))
    setpokemonData(_pokemonData);
  }

  return (
    <> 
    <Navbar />
    <div>
      {loading ? <h1 style={{ textAlign: 'center' }}> Loading ... </h1> : (
        <>
          <div className="btn">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
          <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                return <Home key={i} pokemon={pokemon} />;
              })}
          </div>
          <div className="btn">
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </div>
        </>
      )}
    </div>
    
    </>
  );
}

export default App;
