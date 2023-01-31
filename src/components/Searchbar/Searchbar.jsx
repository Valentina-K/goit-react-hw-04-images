import { useState } from 'react';
import Notiflix from 'notiflix';
import imgSearch from '../../images/imgSearch.svg';

export const Searchbar = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const onChange = e => setSearch(e.target.value);
  const onSubmit = e => {
    e.preventDefault();
    if (search === '') {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    onSearch(search);
  };
  const onFocus = () => setSearch('');
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button
          type="submit"
          className="SearchForm-button"
          style={{ backgroundImage: `url(${imgSearch})` }}
        >
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          name="search"
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={search}
          onChange={onChange}
          onFocus={onFocus}
        />
      </form>
    </header>
  );
};
