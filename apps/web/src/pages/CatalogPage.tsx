import { useEffect, useMemo, useState } from 'react';
import { Header } from '../components/Header';
import { ProductCard } from '../features/catalog/components/ProductCard';
import { demoCatalogRepository } from '../services/catalog/demoCatalogRepository';
import type { CatalogFilters, FragranceWithPresentations, ProductFormat } from '../types/catalog';
import { DEFAULT_FILTERS } from '../types/catalog';
import './CatalogPage.css';

const BRAND_OPTIONS = [
  { id: 'demo-brand-1', name: 'Maison Demo' },
  { id: 'demo-brand-2', name: 'Atelier Ficticio' },
  { id: 'demo-brand-3', name: 'Oasis Árabe (Demo)' },
  { id: 'demo-brand-4', name: 'Nicho Ejemplo' },
];

const FAMILY_OPTIONS = [
  'Ámbar amaderado',
  'Cítrico aromático',
  'Oriental amaderado',
  'Floral especiado',
];

const FORMAT_OPTIONS: Array<{ value: ProductFormat | 'all'; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'bottle', label: 'Botella completa' },
  { value: 'decant', label: 'Decant' },
];

export function CatalogPage() {
  const [filters, setFilters] = useState<CatalogFilters>(DEFAULT_FILTERS);
  const [items, setItems] = useState<FragranceWithPresentations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await demoCatalogRepository.list(filters);
        if (!cancelled) {
          setItems(results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar el catálogo');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [filters]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.query.trim() !== '' ||
      filters.brandId !== null ||
      filters.family !== null ||
      filters.format !== 'all'
    );
  }, [filters]);

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  return (
    <div className="catalog-page">
      <Header demoLabel="Datos de demostración — Nivel 1" />

      <main className="catalog-page__main">
        <section className="catalog-page__intro">
          <h2 className="catalog-page__title">Catálogo</h2>
          <p className="catalog-page__description">
            Fragancias de demostración. Puedes buscar por nombre, marca, familia o notas. Se distingue claramente entre botella completa y decant.
          </p>
        </section>

        <section className="catalog-page__filters" aria-label="Filtros del catálogo">
          <div className="catalog-page__filter-row">
            <label className="catalog-page__field catalog-page__field--search">
              <span className="catalog-page__field-label">Buscar</span>
              <input
                type="search"
                className="catalog-page__input"
                placeholder="Nombre, marca, familia o notas..."
                value={filters.query}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                aria-label="Buscar productos"
              />
            </label>
          </div>

          <div className="catalog-page__filter-row catalog-page__filter-row--grid">
            <label className="catalog-page__field">
              <span className="catalog-page__field-label">Marca</span>
              <select
                className="catalog-page__select"
                value={filters.brandId ?? ''}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, brandId: e.target.value === '' ? null : e.target.value }))
                }
              >
                <option value="">Todas</option>
                {BRAND_OPTIONS.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="catalog-page__field">
              <span className="catalog-page__field-label">Familia olfativa</span>
              <select
                className="catalog-page__select"
                value={filters.family ?? ''}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, family: e.target.value === '' ? null : e.target.value }))
                }
              >
                <option value="">Todas</option>
                {FAMILY_OPTIONS.map((fam) => (
                  <option key={fam} value={fam}>
                    {fam}
                  </option>
                ))}
              </select>
            </label>

            <label className="catalog-page__field">
              <span className="catalog-page__field-label">Formato</span>
              <select
                className="catalog-page__select"
                value={filters.format}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, format: e.target.value as ProductFormat | 'all' }))
                }
              >
                {FORMAT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {hasActiveFilters && (
            <div className="catalog-page__actions">
              <button type="button" className="catalog-page__reset" onClick={resetFilters}>
                Limpiar filtros
              </button>
            </div>
          )}
        </section>

        <section className="catalog-page__results" aria-live="polite" aria-busy={loading}>
          {loading && <p className="catalog-page__status">Cargando catálogo de demostración...</p>}
          {!loading && error && (
            <div className="catalog-page__status catalog-page__status--error" role="alert">
              <p>Error: {error}</p>
            </div>
          )}
          {!loading && !error && items.length === 0 && (
            <div className="catalog-page__status">
              <p>No se encontraron productos con los filtros aplicados.</p>
              {hasActiveFilters && (
                <button type="button" className="catalog-page__reset" onClick={resetFilters}>
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
          {!loading && !error && items.length > 0 && (
            <div className="catalog-page__grid">
              {items.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="catalog-page__footer">
        <p>Prototipo Nivel 1 — Huelepectacular. Los datos mostrados son de demostración.</p>
      </footer>
    </div>
  );
}
