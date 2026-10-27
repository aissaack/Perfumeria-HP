import { Link } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import './HomePage.css';

const QUICK_ACCESS = [
  { label: 'Diseñador', to: '/catalogo?brand=demo-brand-1', filterKey: 'brandId', filterValue: 'demo-brand-1' },
  { label: 'Árabes', to: '/catalogo?family=Oriental%20amaderado', filterKey: 'family', filterValue: 'Oriental amaderado' },
  { label: 'Nicho', to: '/catalogo?brand=demo-brand-4', filterKey: 'brandId', filterValue: 'demo-brand-4' },
  { label: 'Decants', to: '/catalogo?format=decant', filterKey: 'format', filterValue: 'decant' },
  { label: 'Alternativas económicas', to: '/catalogo', filterKey: null, filterValue: null },
];

export function HomePage() {
  return (
    <div className="home-page">
      <Header demoLabel="Datos de demostración" />
      <main className="home-page__main">
        <section className="home-hero">
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">Prototipo de rediseño · Nivel 1</p>
            <h1 className="home-hero__title">Una perfumería cuidada, pensada para descubrir y probar</h1>
            <p className="home-hero__subtitle">
              Presentación clara de fragancias de diseñador, árabes, nicho y alternativas más económicas. Botella completa o decant, sin confusiones.
            </p>
            <div className="home-hero__actions">
              <Link to="/catalogo" className="home-hero__cta">
                Ver catálogo
              </Link>
              <Link to="/catalogo?format=decant" className="home-hero__cta home-hero__cta--ghost">
                Explorar decants
              </Link>
            </div>
          </div>
        </section>

        <section className="home-section home-section--featured">
          <div className="home-featured">
            <div>
              <p className="home-featured__eyebrow">Línea propia</p>
              <h2 className="home-featured__title">Perfumes Huelepectacular</h2>
              <p className="home-featured__text">
                Colección exclusiva de demostración. Fragancias propias, claramente separadas del catálogo general.
              </p>
            </div>
            <Link to="/perfumes-huelepectacular" className="home-hero__cta">
              Ver línea propia
            </Link>
          </div>
        </section>

        <section className="home-section">
          <header className="home-section__header">
            <div>
              <h2 className="home-section__title">Accesos rápidos</h2>
              <p className="home-section__subtitle">Explorá por segmento con los filtros del catálogo</p>
            </div>
          </header>
          <div className="home-quick">
            {QUICK_ACCESS.map((item) => (
              <Link key={item.label} to={item.to} className="home-quick__item">
                <span className="home-quick__label">{item.label}</span>
                <span className="home-quick__arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-section home-section--subtle">
          <div className="home-note">
            <div>
              <h2 className="home-note__title">Demo comercial, sin compra real</h2>
              <p className="home-note__text">
                Esta propuesta muestra una mejora en presentación, jerarquía y descubrimiento. Los precios, marcas y productos son ficticios. La compra se realizaría por el canal acordado.
              </p>
            </div>
            <Link to="/catalogo" className="home-hero__cta">
              Ir al catálogo
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
