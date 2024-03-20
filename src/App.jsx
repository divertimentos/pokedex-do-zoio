import { useState, useEffect } from "react";
import "./App.css";
import FetchButton from "./components/FetchButton";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchedItem, setSearchedItem] = useState('');
  const [toggleClicked, setToggleClicked] = useState(false);

  const handleSearch = () => {
    setToggleClicked((curr) => !curr)
    setFilteredList(filteredList.filter(item => item.name.includes(searchedItem)))

  }

  const handleReset = () => {
    setToggleClicked((curr) => !curr)
    setSearchedItem('')
    setFilteredList(pokemonList)
  }

  const handleChange = ({ target: { value } }) => setSearchedItem(value)


  useEffect(() => {
    if (pokemonList.length > 0) {
      setFilteredList(pokemonList);
      setShowSearch(true);
    }
  }, [pokemonList]);

  const fetchPokemon = () => {
    setIsLoading(true);
    setTimeout(() => {
      fetch("https://pokeapi.co/api/v2/pokemon")
        .then((response) => response.json())
        .then((data) => setPokemonList(data.results))
        .finally(() => {
          setIsLoading(false);
        });
    }, 2000);
  };

  return (
    <>
      <h1>Pokédex do Pikachu</h1>
      <FetchButton prop={fetchPokemon} />
      {!isLoading && showSearch && (
        <div className="card search">
          <input value={searchedItem} onChange={handleChange} type="text" />
          {!toggleClicked && (
            <button onClick={handleSearch}>Buscar</button>
          )}

          {toggleClicked && (
            <button onClick={handleReset}>Resetar</button>
          )}
        </div>
      )}
      {isLoading && (
        <div className="pokemon-card">
          <h2>
            <strong>Carregandersons...</strong>
          </h2>
        </div>
      )}
      {!isLoading && filteredList.length > 1 && (
        <div className="pokemon-card">
          {filteredList.map((item) => {
            return <p key={item}>{item.name}</p>;
          })}
        </div>
      )}
    </>
  );
}

export default App;
