
import './styles/App.css'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilmPage from './pages/filmPage';

function App() {
  return(
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/film/:id" element={<FilmPage />} />
      </Routes>
    </Router>

     
  )
 
}

export default App;
