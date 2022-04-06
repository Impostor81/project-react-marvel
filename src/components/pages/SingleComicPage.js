import { useParams, Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './singleComicPage.scss';

const SingleComicPage = () => {
  const {comicId} = useParams();
  const [comic, setComic] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const marvelService = new MarvelService();

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const onComicLoaded = (comic) => {
    setComic(comic);
    setLoading(false);
  }

  const onComicLoading = () => {
    setLoading(true);
  }

  const onError = () => {
    setLoading(false);
    setError(true);
  }

  const updateComic = () => {
    onComicLoading();

    marvelService
      .getComic(comicId)
      .then(onComicLoaded)
      .catch(onError)
  };

  const errorMes = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMes}
      {spinner}
      {content}
    </>
  );
};

const View = ({comic}) => {
  const {title, description, pageCount, thumbnail, language, price} = comic;

  return (
    <div className='single-comic'>
      <img src={thumbnail} alt={title} className='single-comic__img' />
      <div className='single-comic__info'>
        <h2 className='single-comic__name'>{title}</h2>
        <p className='single-comic__descr'>
          {description}
        </p>
        <p className='single-comic__descr'>{pageCount}</p>
        <p className='single-comic__descr'>Language: {language}</p>
        <div className='single-comic__price'>{price}</div>
      </div>
      <Link to='/comics' className='single-comic__back' style={{color: 'blue'}}>
        Back to all
      </Link>
    </div>
  )
}

export default SingleComicPage;
