import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';

function FavoriteRecipes() {
  const history = useHistory();
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState([]); const [like, setLiked] = useState([]);

  // Recupera a lista de favoritos do localStorage, ou cria uma nova lista vazia se não houver nenhuma
  useEffect(() => {
    const e = JSON.parse(localStorage.getItem('favoriteRecipes')) || []; setLiked(e);
  }, []);
  // Define a lista filtrada como a lista de favoritos atual sempre que a lista de favoritos for atualizada
  useEffect(() => {
    setSearch(like);
  }, [like]);
  // Define a lista filtrada como a lista de favoritos completa quando o botão é clicado
  const handleAll = () => {
    setSearch(like);
  };
  // Objeto que mapeia as opções de filtro
  const filterOptions = {
    all: () => setSearch(like),
    meal: () => setSearch(like.filter((favorite) => favorite.type === 'meal')),
    drink: () => setSearch(like.filter((favorite) => favorite.type === 'drink')),
  };
  // Obtém a opção de filtro selecionada e chama a função correspondente
  const handleFlterFunc = ({ target }) => {
    const option = target.name; filterOptions[option]();
  };
  // Remove o favorito e atualiza a lista de favoritos no localStorage e no estado
  const handleDislike = ({ target }) => setLiked((prevDislike) => {
    const fav = prevDislike.filter((favorite) => favorite.id !== target.name);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
    return fav;
  });
  // Copia o link da receita correspondente para a área de transferência e exibe uma mensagem de sucesso
  const handleCopy = async ({ type, id }) => {
    await clipboardCopy(`http://localhost:3000/${type}s/${id}`); setNotes('Link copied!');
  };

  return (
    <div>

      <Header
        pathName={ history.location.pathname }
        canSearch={ false }
        title="Favorite Recipes"
      />

      <section>
        {notes}
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleAll }
        >
          Items
        </button>

        <button
          data-testid="filter-by-meal-btn"
          name="meal"
          type="button"
          onClick={ (event) => handleFlterFunc(event) }
        >
          Meals
        </button>

        <button
          data-testid="filter-by-drink-btn"
          name="drink"
          type="button"
          onClick={ (event) => handleFlterFunc(event) }
        >
          Beverages
        </button>
      </section>

      <main>
        {search.map((param1, param2) => (
          <div key={ param2 }>
            <Link to={ `${param1.type}s/${param1.id}` }>
              <img
                data-testid={ `${param2}-horizontal-image` }
                src={ param1.image }
                alt={ param1.name }
                style={ { width: '80px' } }
              />
              {param1.type === 'meal' ? (
                <p data-testid={ `${param2}-horizontal-top-text` }>
                  {`${param1.nationality} - ${param1.category}`}
                </p>
              ) : (
                <p data-testid={ `${param2}-horizontal-top-text` }>
                  {param1.alcoholicOrNot}
                </p>
              )}
              <p data-testid={ `${param2}-horizontal-name` }>{ param1.name }</p>
            </Link>

            <button type="button" onClick={ () => handleCopy(param1) }>
              <img
                src={ shareIcon }
                alt="Share Icon"
                data-testid={ `${param2}-horizontal-share-btn` }
              />
            </button>

            <button type="button" onClick={ handleDislike }>
              <img
                data-testid={ `${param2}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                alt="Black Heart Icon"
                name={ param1.id }
              />
            </button>

          </div>
        ))}
      </main>
    </div>
  );
}
export default FavoriteRecipes;
