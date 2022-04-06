import {useState, useEffect} from 'react';
import MarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './comicsList.scss';

const ComicsList = () => {

  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    onRequest(offset);
  }, []);

  const onRequest = (offset) => {
    marvelService.getAllComics(offset)
      .then(onComicsListLoaded)
      .catch(onError)
  }

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
        ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset + 8);
    setLoading(false);
    setComicsEnded(ended);
  }

  const onListLoading = () => {
    setLoading(true);
    setNewItemLoading(true);
  }

  const onError = () => {
    setLoading(false);
    setError(true);
  }

  function renderItems (arr) {
    const items = arr.map((item, i) => {
      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    return (
      <ul className="comics__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(comicsList);

  const errorMes = error ? < ErrorMessage /> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="comics__list">
      {errorMes}
      {spinner}
      {content}
      <button 
          disabled={newItemLoading} 
          style={{'display' : comicsEnded ? 'none' : 'block'}}
          className="button button__main button__long"
          onClick={() => onRequest(offset)}>
          <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList;
