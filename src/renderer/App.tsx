import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { MovieSearch } from '../Page/MovieSearch';
import { MovieDetail } from '../Page/MovieDetails ';
import { MovieList } from '../Page/MovieList';

export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MovieSearch />} />  
        <Route path="/movies" element={<MovieList />} /> 
        <Route path="/movies/:movieId" element={<MovieDetail />} /> 
      </Routes>
    </Router>
  );
}
