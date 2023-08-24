# Pokedex

A Pokedex is used to display information about an entered pokemon. This was a super fun project and was my first in depth project into react and API consumption. 
I learned a lot about ternary operators, destructing API calls, filter and map functions within JS and API consumption practice.

# Features
Contains three API calls

One to return base stats and basic information about an inputted pokemon

One to generate an autocomplete function

One to highlight evolutions. 

# Key Consideration and Main Limitation
This project does not consume API data efficiently as it requires a fetch request per pokemon so that relevant information can be destructured for the autocomplete to function.
For demonstration purposes this app is limited to the first 151 pokemon.
I am currently reviewing the API docs and tutorials to overcome this. Would very much love any insight into this

# Structure
On page load, an input field and button prompts the user to select a pokemon. As they type an autocomplete appears that returns the name and sprite for every character that matches the user input

Once a pokemon is chosen the name value is passed into the input and the search button reappears

Once clicked, various pokemon stats appear including name, sprite, hp, attack, defense, special attack, special defense, speed. 

Evolution appears if the pokemon evolves. Currently it only works if the pokemon evolves by minimum level and only has one evolution

# Limitations
Key component of autocomplete runs off inefficient API practice

evolution only works if the pokemon is the base form and evolves via minimum level

# Features to add
Fix above limitiations

Add search functionality to trigger after pokemon is selected

if pokemon does evolve, enable the evolutions name to be clickable so that it returns the new pokemons data. 

