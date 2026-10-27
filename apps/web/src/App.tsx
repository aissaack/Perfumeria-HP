import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perfumes-huelepectacular" element={<CatalogPage section="own" title="Perfumes Huelepectacular" description="Línea propia de demostración. Productos exclusivos de Huelepectacular, separados del catálogo general." />} />
        <Route path="/catalogo" element={<CatalogPage section="general" title="Catálogo" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
