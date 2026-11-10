import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { getSearchSection, normalizeSearch, searchCatalog, sectionLabels, sectionPaths } from '../services/catalog/searchCatalog';
import type { SearchSection } from '../services/catalog/searchCatalog';
import './Header.css';

interface HeaderProps {
  demoLabel?: string;
}

export function Header({ demoLabel = 'Datos de demostración' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const appliedQuery = new URLSearchParams(location.search).get('q') ?? '';
  const draftKey = JSON.stringify([location.pathname, appliedQuery]);
  const [draftState, setDraftState] = useState({ key: draftKey, value: appliedQuery });
  const draft = draftState.key === draftKey ? draftState.value : appliedQuery;
  function setDraft(value: string) { setDraftState({ key: draftKey, value }); }
  const [suggestions, setSuggestions] = useState<Array<{ name: string; section: SearchSection }>>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  useEffect(() => {
    let active = true;
    const query = draft.trim();
    if (!query) return;
    const timer = window.setTimeout(() => {
      searchCatalog(query).then((items) => {
        if (!active) return;
        const brands = new Map<string, { name: string; section: SearchSection }>();
        items.filter((item) => normalizeSearch(item.brand.name).includes(normalizeSearch(query))).forEach((item) => {
          const section = getSearchSection(item);
          brands.set(section + ':' + item.brand.name, { name: item.brand.name, section });
        });
        setSuggestions([...brands.values()].slice(0, 8));
      }).catch(() => { if (active) setSuggestions([]); });
    }, 150);
    return () => { active = false; window.clearTimeout(timer); };
  }, [draft]);
  function selectSuggestion(suggestion: { name: string; section: SearchSection }) {
    setSuggestionsOpen(false);
    navigate({ pathname: sectionPaths[suggestion.section], search: '?' + new URLSearchParams({ q: suggestion.name }).toString() });
  }

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
    const query = draft.trim();
    setSuggestionsOpen(false);
    navigate({ pathname: '/buscar', search: query ? '?' + new URLSearchParams({ q: query }).toString() : '' });
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
          <NavLink end to="/catalogo" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hp-header__nav-link ${isActive ? 'is-active' : ''}`}>Catálogo</NavLink>
          <NavLink to="/catalogo/nicho" onClick={() => setMenuOpen(false)} className={({ isActive }) => `hp-header__nav-link ${isActive ? 'is-active' : ''}`}>Perfumes de Nicho</NavLink>
        </nav>
        <form className="hp-header__search" role="search" onSubmit={submitSearch} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setSuggestionsOpen(false); }}>
          <label className="hp-header__sr-only" htmlFor="header-search">Buscar productos</label>
          <input id="header-search" type="search" placeholder="Buscar perfumes..." value={draft} autoComplete="off" role="combobox" aria-autocomplete="list" aria-expanded={suggestionsOpen && !!draft.trim() && suggestions.length > 0} aria-controls="search-suggestions" aria-activedescendant={suggestionsOpen && activeSuggestion >= 0 ? `search-option-${activeSuggestion}` : undefined} onFocus={() => setSuggestionsOpen(true)} onChange={(event) => { setDraft(event.target.value); setSuggestions([]); setSuggestionsOpen(true); setActiveSuggestion(-1); }} onKeyDown={(event) => { if (event.key === 'Escape') { setSuggestionsOpen(false); setActiveSuggestion(-1); } else if (event.key === 'ArrowDown' && suggestions.length) { event.preventDefault(); setSuggestionsOpen(true); setActiveSuggestion((index) => (index + 1) % suggestions.length); } else if (event.key === 'ArrowUp' && suggestions.length) { event.preventDefault(); setSuggestionsOpen(true); setActiveSuggestion((index) => (index - 1 + suggestions.length) % suggestions.length); } else if (event.key === 'Enter' && suggestionsOpen && activeSuggestion >= 0 && suggestions[activeSuggestion]) { event.preventDefault(); selectSuggestion(suggestions[activeSuggestion]); } }} />
          {suggestionsOpen && draft.trim() && suggestions.length > 0 && <ul id="search-suggestions" className="hp-header__suggestions" role="listbox">{suggestions.map((suggestion, index) => <li key={suggestion.section + suggestion.name} id={`search-option-${index}`} role="option" aria-selected={index === activeSuggestion} onMouseDown={(event) => event.preventDefault()} onClick={() => selectSuggestion(suggestion)}>{suggestion.name} <span>· {sectionLabels[suggestion.section]}</span></li>)}</ul>}
          <button type="submit">Buscar</button>
        </form>
        <div className="hp-header__demo" aria-label={demoLabel}><span className="hp-header__demo-badge">Demo · {demoLabel}</span></div>
      </div>
    </header>
  );
}
