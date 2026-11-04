import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getSearchSection, searchCatalog, sectionLabels, sectionPaths } from '../services/catalog/searchCatalog';
import type { SearchSection } from '../services/catalog/searchCatalog';
import type { FragranceWithPresentations } from '../types/catalog';
import './CatalogPage.css';

const sections: SearchSection[] = ['own', 'general', 'niche'];
export function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get('q')?.trim() ?? '';
  const [result, setResult] = useState<{ query: string; items: FragranceWithPresentations[]; error: boolean } | null>(null);
  useEffect(() => {
    let active = true;
    searchCatalog(query).then((items) => { if (active) setResult({ query, items, error: false }); }).catch(() => { if (active) setResult({ query, items: [], error: true }); });
    return () => { active = false; };
  }, [query]);
  const loading = result?.query !== query;
  return <div className="catalog-page"><Header /><main className="catalog-page__main"><h1>Resultados de búsqueda</h1>
    {!query ? <p>Escribí una búsqueda para encontrar perfumes de demostración.</p> : <p>Resultados para «{query}» · Datos de demostración</p>}
    {loading && <p role="status">Buscando...</p>}
    {!loading && result?.error && <p role="alert">No pudimos completar la búsqueda. Intentá de nuevo.</p>}
    {!loading && !result?.error && query && result?.items.length === 0 && <p>No encontramos resultados. Probá con otro nombre o marca.</p>}
    {!loading && !result?.error && sections.map((section) => {
      const items = result?.items.filter((item) => getSearchSection(item) === section) ?? [];
      if (!items.length) return null;
      return <section key={section} className="search-results__section"><h2>{sectionLabels[section]}</h2><ul>{items.map((item) => {
        const presentation = item.presentations[0];
        return <li key={item.id}>{presentation ? <Link to={{ pathname: sectionPaths[section] + '/producto/' + encodeURIComponent(presentation.id), search: '?' + new URLSearchParams({ volver: '?' + new URLSearchParams({ q: query }).toString() }).toString() }}>{item.brand.name} · {item.name}</Link> : <span>{item.brand.name} · {item.name}</span>}</li>;
      })}</ul><Link to={{ pathname: sectionPaths[section], search: '?' + new URLSearchParams({ q: query }).toString() }}>Ver resultados en {sectionLabels[section]}</Link></section>;
    })}
  </main><Footer /></div>;
}
