import { useState, useEffect } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

const CharList = (props) => {

  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [activeItem, setActiveItem] = useState(0);

  const marvelService = new MarvelService();

  // выполнится только один раз, если передали []
  useEffect(() => {
    onRequest();
  }, [])

  const onRequest = (offset) => {
    if (!error) {
      onListLoading();
    }
    marvelService.getAllCharacters(offset)
      .then(onListLoaded)
      .catch(onError)
  }

  const onListLoaded = (newCharList) => {
    setCharList(charList => [...charList, ...newCharList]);
    setLoading(false);
    setError(false);
    setNewItemsLoading(false);
    setOffset(offset => offset + 9);
  }

  const onListLoading = () => {
    setLoading(true);
    setNewItemsLoading(true);
  }

  const onError = () => {
    setLoading(false);
    setError(true);
  }

  const renderItems = (arr) => {
    const items = arr.map(item => {
      let imgStyle = {objectFit: 'cover'};
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
      imgStyle = {objectFit: 'contain'}
      }
      // let clazz = "char__item";
      // if (activeItem === item.id) {
      //   classList = "char__item char__item_selected";
      // }
      return (
        <li 
          key={item.id}
          className = {
            activeItem === item.id
              ? 'char__item char__item_selected'
              : 'char__item'
          }
          onClick={() => {props.onCharSelected(item.id); setActiveItem(item.id)}}
        >
            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
            <div className="char__name">{item.name}</div>
        </li>
      )
    });

    return (
      <ul className = "char__grid" >
        {items}
      </ul>
    )
  }

  const items = renderItems(charList);
  const errorMes = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {errorMes}
      {spinner}
      {content}
      <button
        className="button button__main button__long"
        disabled={newItemsLoading}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default CharList;
