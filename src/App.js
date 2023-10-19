import React, { useState, useEffect } from 'react';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const limit = 10;

  useEffect(() => {
    // Simulated JSON data for Pokemon details
    const pokemonData = [
      { name: 'Pikachu', image: '/images/pikachu.png', CP: 100, attack: 50, defense: 40, type: 'Electric' },
      { name: 'Charizard', image: '/images/charizard.png', CP: 200, attack: 80, defense: 60, type: 'Fire/Flying' },
      { name: 'dragonite', image: '/images/dragonite.png', CP: 200, attack: 80, defense: 60, type: 'Fire/Flying' },
      { name: 'Eevee', image: '/images/eevee.png', CP: 70, attack: 80, defense: 60, type: 'Fire/Flying' },
      { name: 'Gengar', image: '/images/gengar.webp', CP: 20, attack: 90, defense: 55, type: 'Fire' },
      { name: 'Lucario', image: '/images/lucario.png', CP: 300, attack: 40, defense: 60, type: 'Flying' },
      { name: 'Machamp', image: '/images/machamp.png', CP: 500, attack: 20, defense: 80, type: 'Fire/Flying' },
      { name: 'Snorlax', image: '/images/Snorlax.webp', CP: 90, attack: 90, defense: 40, type: 'Electric' },
      { name: 'Squirtle', image: '/images/Squirtle.webp', CP: 80, attack: 30, defense: 20, type: 'Flying' },
      { name: 'Bulbasaur', image: '/images/Bulbasaur.webp', CP: 100, attack: 60, defense: 100, type: 'Fire' },
       { name: 'Psyduck', image: '/images/Psyduck.webp', CP: 80, attack: 40, defense: 20, type: 'Flying' },
      { name: 'Kyogre', image: '/images/kyogre.webp', CP: 100, attack: 90, defense: 100, type: 'Fire' }
    ];

    setPokemonList(pokemonData);
    setTotalPages(Math.ceil(pokemonData.length / limit));
  }, []);

  const handleSearch = () => {
    // Filter the Pokemon list based on the search query
    const filteredPokemon = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPokemonList(filteredPokemon);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredPokemon.length / limit));
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    return (
      <div id="pagination">
        <button
          id="previous"
          disabled={currentPage === 1}
          onClick={() => handlePagination(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          id="next"
          disabled={currentPage === totalPages}
          onClick={() => handlePagination(currentPage + 1)}
        >
          Next
        </button>
      </div>
    );
  };

  const renderPokemonList = () => {
    const startIdx = (currentPage - 1) * limit;
    const endIdx = startIdx + limit;
    const displayedPokemon = pokemonList.slice(startIdx, endIdx);

    return (
      <div className="pokemon-list">
        {displayedPokemon.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <img src={pokemon.image} alt={pokemon.name} />
            <div>Name: {pokemon.name}</div>
            <div>CP: {pokemon.CP}</div>
            <div>Attack: {pokemon.attack}</div>
            <div>Defense: {pokemon.defense}</div>
            <div>Type: {pokemon.type}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app">
      <h1>Pokémon Search</h1>
      <div className="search-bar">
        <input
          id="search"
          type="text"
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {pokemonList.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          {renderPokemonList()}
          {renderPagination()}
        </div>
      )}
    </div>
  );
}

export default App;
