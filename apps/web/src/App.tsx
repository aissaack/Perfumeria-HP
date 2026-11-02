import { BrowserRouter, Route, Routes } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perfumes-huelepectacular" element={<CatalogPage key="own" section="own" title="Perfumes Huelepectacular" description="Línea propia de demostración. Productos exclusivos de Huelepectacular, separados del catálogo general." />} />
        <Route path="/perfumes-huelepectacular/producto/:presentationId" element={<ProductDetailPage />} />
        <Route path="/catalogo" element={<CatalogPage key="general" section="general" title="Catálogo" />} />
        <Route path="/catalogo/producto/:presentationId" element={<ProductDetailPage section="general" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
