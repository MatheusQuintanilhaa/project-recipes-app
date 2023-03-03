import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <section>
        <input
          type="radio"
          data-testid="ingredient-search-radio"
        />
        <label htmlFor="ingredient">Itens</label>
        <input
          type="radio"
          data-testid="name-search-radio"
        />
        <label htmlFor="name">Recipes</label>
        <input
          type="radio"
          data-testid="first-letter-search-radio"
        />
        <label htmlFor="firstLetter">List</label>
      </section>
      <section>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Pesquisar
        </button>
      </section>
    </div>
  );
}
