import { NavLink } from 'react-router';
import './Header.css';

interface HeaderProps {
  demoLabel?: string;
}

export function Header({ demoLabel = 'Datos de demostración' }: HeaderProps) {
  return (
    <header className="hp-header">
      <div className="hp-header__container">
        <div className="hp-header__brand">
          <NavLink to="/" className="hp-header__brand-link" aria-label="Ir al inicio de Huelepectacular">
            <span className="hp-header__title">Huelepectacular</span>
            <span className="hp-header__subtitle">Perfumería · Diseñador, árabe, nicho y decants</span>
          </NavLink>
        </div>
        <nav className="hp-header__nav" aria-label="Navegación principal">
          <NavLink to="/" className={({ isActive }) => `hp-header__nav-link ${isActive ? 'is-active' : ''}`} end>
            Inicio
          </NavLink>
          <NavLink to="/perfumes-huelepectacular" className={({ isActive }) => `hp-header__nav-link hp-header__nav-link--highlight ${isActive ? 'is-active' : ''}`}>
            Perfumes Huelepectacular
          </NavLink>
          <NavLink to="/catalogo" className={({ isActive }) => `hp-header__nav-link ${isActive ? 'is-active' : ''}`}>
            Catálogo
          </NavLink>
        </nav>
        <div className="hp-header__demo" aria-label={demoLabel}>
          <span className="hp-header__demo-badge">Demo · {demoLabel}</span>
        </div>
      </div>
    </header>
  );
}
