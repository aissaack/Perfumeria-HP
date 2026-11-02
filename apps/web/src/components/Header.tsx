import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import './Header.css';

interface HeaderProps {
  demoLabel?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function Header({ demoLabel = 'Datos de demostración', searchValue, onSearchChange }: HeaderProps) {
  const [draft, setDraft] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isOwn = location.pathname.startsWith('/perfumes-huelepectacular');

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const update = () => document.documentElement.style.setProperty('--header-height', `${header.offsetHeight}px`);
    const observer = new ResizeObserver(update);
    observer.observe(header);
    update();
    return () => { observer.disconnect(); document.documentElement.style.removeProperty('--header-height'); };
  }, []);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (onSearchChange) return;
    const query = draft.trim();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    navigate({ pathname: isOwn ? '/perfumes-huelepectacular' : '/catalogo', search: params.toString() ? `?${params}` : '' });
  }

  function handleMenuKey(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape' && menuOpen) {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  }

  return (
    <header ref={headerRef} className="hp-header" onKeyDown={handleMenuKey}>
      <div className="hp-header__container">
        <NavLink to="/" className="hp-header__brand-link" aria-label="Ir al inicio de Huelepectacular">
          <span className="hp-header__title">Huelepectacular</span>
          <span className="hp-header__mobile-demo">Demo</span>
        </NavLink>
        <button ref={menuButtonRef} type="button" className="hp-header__menu-button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? 'Cerrar menú' : 'Menú'}</button>
        <nav id="main-navigation" className={`hp-header__nav${menuOpen ? ' hp-header__nav--open' : ''}`} aria-label="Navegación principal">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hp-header__nav-link ${isActive ? 'is-active' : ''}`} end>Inicio</NavLink>
          <NavLink to="/perfumes-huelepectacular" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hp-header__nav-link hp-header__nav-link--highlight ${isActive ? 'is-active' : ''}`}>Perfumes Huelepectacular</NavLink>
          <NavLink to="/catalogo" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hp-header__nav-link ${isActive ? 'is-active' : ''}`}>Catálogo</NavLink>
        </nav>
        <form className="hp-header__search" role="search" onSubmit={submitSearch}>
          <label className="hp-header__sr-only" htmlFor="header-search">Buscar productos</label>
          <input id="header-search" type="search" placeholder="Buscar perfumes..." value={searchValue ?? draft} onChange={(event) => onSearchChange ? onSearchChange(event.target.value) : setDraft(event.target.value)} />
          <button type="submit">Buscar</button>
        </form>
        <div className="hp-header__demo" aria-label={demoLabel}><span className="hp-header__demo-badge">Demo · {demoLabel}</span></div>
      </div>
    </header>
  );
}
