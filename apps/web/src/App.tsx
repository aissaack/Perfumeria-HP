import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import './App.css';

function GeneralCatalog() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  if (params.get('segment') === 'Nicho') {
    params.delete('segment');
    const search = params.toString();
    return <Navigate replace to={{ pathname: '/catalogo/nicho', search: search ? `?${search}` : '' }} />;
  }
  return <CatalogPage key="general" section="general" title="Catálogo" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/perfumes-huelepectacular" element={<CatalogPage key="own" section="own" title="Perfumes Huelepectacular" description="Línea propia de demostración. Productos exclusivos de Huelepectacular, separados del catálogo general." />} />
        <Route path="/perfumes-huelepectacular/producto/:presentationId" element={<ProductDetailPage />} />
        <Route path="/catalogo" element={<GeneralCatalog />} />
        <Route path="/catalogo/nicho" element={<CatalogPage key="niche" section="general" niche />} />
        <Route path="/catalogo/nicho/producto/:presentationId" element={<ProductDetailPage section="general" niche />} />
        <Route path="/catalogo/producto/:presentationId" element={<ProductDetailPage section="general" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
