import { useState, useEffect, useRef } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState({
    name: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    specialattack: "",
    specialdefense: "",
    speed: "",
    type: "",
    abilities: "",
  });
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [evolution, setEvolution] = useState([]);
  const wrapperRef = useRef(null);

  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`).then(
      (response) => {
        setPokemon({
          name: pokemonName,
          img: response.data.sprites.front_shiny,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          specialattack: response.data.stats[3].base_stat,
          specialdefense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          type: response.data.types[0].type.name,
          abilities: response.data.abilities[0].ability.name,
        });
        setPokemonChosen(true);
        // console.log(response);
      }
    );
  }
  useEffect(() => {
    const pokemon = [];
    const promises = new Array(151).fill().map((value, i) => fetch(`https://pokeapi.co/api/v2/pokemon-form/${i + 1}`))
    Promise.all(promises).then((pokemonArray) => {
      return pokemonArray.map(response =>
        response.json().then(({ name, sprites: { front_shiny: sprite } }) => {
          return pokemon.push({ name, sprite });
        })
      );
    });
    setOptions(pokemon);
  }, []);

  useEffect(() => {
    // this currently only works for pokemon that evolve from a base form on levelling up
    const evolve = [];
    const evolutionPromises = new Array(151).fill().map((value, i) => fetch(`https://pokeapi.co/api/v2/evolution-chain/${i + 1}`))
    Promise.all(evolutionPromises).then((evolveArray) => {
      return evolveArray.map(resp => {
        return resp.json().then(
          (
            {chain: 
           { species: {name: base},
             evolves_to: [{ species: { name: evolvesTo }, 
             evolution_details: [ { min_level: level } ]
          }]}}) => {
          return evolve.push({ base, evolvesTo, level });
        })
      }
      );
    });
    setEvolution(evolve);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    };
  }, []);

  const handleClickOutside = event => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(display);
    };
  }

  const setPokedex = poke => {
    setPokemonName(poke);
    setSearch(poke);
    setDisplay(false);
  }
 
  return (
    <div className="app">
      <div className="titleSection">
        <h1>Pokemon Stats</h1>
        <input
          type="text"
          onChange={(event) => {
            setPokemonName(event.target.value);
            setSearch(event.target.value);
          }}
          onClick={() => setDisplay(!display)}
          value={search}
          placeholder="Enter Pokemon" />
        {display && (
          <div ref={wrapperRef}
            className="autoContainer">
            {options.filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
              .map((value, i) => {
                return <div onClick={() => setPokedex(value.name)}
                  className="option" key={i} tabIndex={0}>
                  <span>{value.name}</span>
                  <img src={value.sprite} alt="pokemon" />
                </div>
              })}
          </div>
        )}
        {display ? ('') : (<button onClick={searchPokemon}>Search Pokemon</button>)}
      </div>
      <div className="displaySection">
        {!pokemonChosen ? (<h1>Please Choose a Pokemon</h1>) : (
          <>
            <h1>{pokemon.name.toUpperCase()}</h1>
            <img src={pokemon.img} />
            <h3>Type: {pokemon.type}</h3>
            <h3>Ability: {pokemon.abilities}</h3>
            <h3>Hp: {pokemon.hp}</h3>
            <h3>Attack: {pokemon.attack}</h3>
            <h3>Defense: {pokemon.defense}</h3>
            <h3>Special Attack: {pokemon.specialattack}</h3>
            <h3>Special Defense: {pokemon.specialdefense}</h3>
            <h3>Speed: {pokemon.speed}</h3>
            // {
            //   evolution.filter(({base}) => base == pokemon.name).map(value => (<h3>Evolves to {value.evolvesTo} at level {value.level}</h3>))
            // }
          </>)}
      </div>
    </div>
  );
};
export default App;
