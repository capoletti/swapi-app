// src/react-app/App.tsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import DetailsPage from './pages/DetailsPage';
import './styles/main.css';

const App = () => {
  const resources = ['films', 'people', 'planets', 'species', 'starships', 'vehicles'];

  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {resources.map((resource) => (
            <Route key={resource} path={`/${resource}`} element={<ListPage resource={resource} />} />
          ))}
          {resources.map((resource) => (
            <Route key={`${resource}-detail`} path={`/${resource}/:id`} element={<DetailsPage resource={resource} />} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

export default App;
