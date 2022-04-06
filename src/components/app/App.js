import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {MainPage, ComicsPage, SingleComicPage}  from '../pages';
import AppHeader from '../appHeader/AppHeader';
import Page404 from '../pages/404';

const App = () => {
  return (
    <Router basename = "/project-react-marvel">
      <div className='app'>
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path = "/comics" element={<ComicsPage />} />
            <Route path = "/comics/:comicId" element={<SingleComicPage />} />
            <Route path = "*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
