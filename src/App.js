import { useState } from 'react';
import './App.css';
import axios from 'axios';


const App = () => {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemon, setPokemon] = useState({
    name: "",
    species:"",
    img:"",
    hp: "",
    attack:"",
    defense: "",
    type:""
  });
  const [pokemonChosen, setPokemonChosen] = useState(false);
//   const [pokemonType, setPokemonType] = useState("");
const searchPokemon = () => {
  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`).then(
        (response) => {
          setPokemon({
            name: pokemonName,
            species: response.data.species.name,
            img: response.data.sprites.front_shiny,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: response.data.types[0].type.name,
            abilities: response.data.abilities[0].ability.name,
          });
          setPokemonChosen(true);
          console.log(response);
          }
         );
    // const checkPokemon = () => {
    //   if(setPokemonName(event.target.value) != response.data.name){
    //     <h1>This pokemon does not exist</h1>
    //   }else{
    //     setPokemonChosen(true)
    //   }
        }
    return (
        <div className="app">
            <div className="titleSection">
                <h1>Pokemon Stats</h1>
                     <input
                       type="text"
                     onChange={(event) => {
                setPokemonName(event.target.value);
                           }} />
                 <button onClick={searchPokemon}>Search Pokemon</button>
              </div>
            <div className ="displaySection">
            {!pokemonChosen ? ( <h1>Please Choose a Pokemon</h1> ) : (
           <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.img} />
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h3>Ability: {pokemon.abilities}</h3>
            <h3>Hp: {pokemon.hp}</h3>
            <h3>Attack: {pokemon.attack}</h3>
            <h3>Defense: {pokemon.defense}</h3>
            </>)}
            </div>
        </div>
    );
            };
          


export default App;