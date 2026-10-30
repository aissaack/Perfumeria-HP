import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../features/catalog/components/ProductCard';
import { demoCatalogRepository } from '../services/catalog/demoCatalogRepository';
import type { CatalogFilters, FragranceCategory, FragranceWithPresentations, ProductFormat } from '../types/catalog';
import { DEFAULT_FILTERS, FRAGRANCE_CATEGORY_LABELS } from '../types/catalog';
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
  'Floral cítrico',
  'Oriental amaderado',
  'Floral especiado',
];

const FORMAT_OPTIONS: Array<{ value: ProductFormat | 'all'; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'bottle', label: 'Botella completa' },
  { value: 'decant', label: 'Decant' },
];

interface CatalogPageProps {
  section?: 'own' | 'general';
  title?: string;
  description?: string;
}

export function CatalogPage({ section = 'general', title, description }: CatalogPageProps = {}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<Omit<CatalogFilters, 'section'>>(() => {
    const query = searchParams.get('q') || '';
    const brandId = searchParams.get('brand');
    const family = searchParams.get('family');
    const category = searchParams.get('category');
    const format = searchParams.get('format') as ProductFormat | 'all' | null;
    return {
      ...DEFAULT_FILTERS,
      query,
      brandId: brandId && brandId.trim() ? brandId : null,
      family: family && family.trim() ? family : null,
      category: category === 'masculine' || category === 'feminine' || category === 'unisex' ? category : 'all',
      format: format === 'bottle' || format === 'decant' || format === 'all' ? format : 'all',
    };
  });
  const [items, setItems] = useState<FragranceWithPresentations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedSection, setLoadedSection] = useState<CatalogPageProps['section']>();
  const isLoading = loading || loadedSection !== section;

  useEffect(() => {
    const next = new URLSearchParams();
    if (filters.query.trim()) next.set('q', filters.query.trim());
    if (filters.brandId) next.set('brand', filters.brandId);
    if (filters.family) next.set('family', filters.family);
    if (filters.category !== 'all') next.set('category', filters.category);
    if (filters.format !== 'all') next.set('format', filters.format);
    setSearchParams(next, { replace: true });
  }, [filters, setSearchParams]);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await demoCatalogRepository.list({ ...filters, section });
        if (!cancelled) {
          setItems(results);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Error al cargar el catálogo');
        }
      } finally {
        if (!cancelled) {
          setLoadedSection(section);
          setLoading(false);
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [filters, section]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.query.trim() !== '' ||
      filters.brandId !== null ||
      filters.family !== null ||
      filters.category !== 'all' ||
      filters.format !== 'all'
    );
  }, [filters]);

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  const pageTitle = title || (section === 'own' ? 'Perfumes Huelepectacular' : 'Catálogo');
  const pageDescription =
    description ||
    (section === 'own'
      ? 'Línea propia de demostración. Productos de Huelepectacular, separados del catálogo general.'
      : 'Fragancias de demostración. Puedes buscar por nombre, marca, familia o notas. Se distingue claramente entre botella completa y decant.');

  const pageClass = section === 'own' ? 'catalog-page catalog-page--own catalog-page--own-theme' : 'catalog-page';

  return (
    <div className={pageClass}>
      <Header demoLabel="Datos de demostración — Nivel 1" />

      <main className="catalog-page__main">
        {section === 'own' && (
          <section className="own-hero">
            <div className="own-hero__header">
              <p className="own-hero__eyebrow">Colección exclusiva · Huelepectacular</p>
              <h2 className="own-hero__title">Perfumes Huelepectacular</h2>
              <p className="own-hero__subtitle">Dos creaciones propias con personalidades distintas, unidas por una misma intención.</p>
            </div>
            <div className="own-hero__grid">
              <article className="own-hero__panel own-hero__panel--violet">
                <div className="own-hero__panel-inner">
                  <div className="own-hero__panel-meta">
                    <span className="own-hero__pill">Creación propia</span>
                    <span className="own-hero__pill own-hero__pill--gold">Línea exclusiva</span>
                  </div>
                  <h3 className="own-hero__panel-title">Bruma Ámbar</h3>
                  <p className="own-hero__panel-subtitle">Perfil cálido y envolvente · Demostración</p>
                </div>
                <div className="own-hero__panel-glow own-hero__panel-glow--violet" aria-hidden="true"></div>
              </article>
              <div className="own-hero__divider" aria-hidden="true">
                <span className="own-hero__accent"></span>
              </div>
              <article className="own-hero__panel own-hero__panel--crimson">
                <div className="own-hero__panel-inner">
                  <div className="own-hero__panel-meta">
                    <span className="own-hero__pill">Creación propia</span>
                    <span className="own-hero__pill own-hero__pill--gold">Línea exclusiva</span>
                  </div>
                  <h3 className="own-hero__panel-title">Sol de Azahar</h3>
                  <p className="own-hero__panel-subtitle">Perfil floral cítrico luminoso · Demostración</p>
                </div>
                <div className="own-hero__panel-glow own-hero__panel-glow--crimson" aria-hidden="true"></div>
              </article>
            </div>
            <div className="own-hero__intro">
              <p className="own-hero__intro-text">{pageDescription}</p>
            </div>
          </section>
        )}
        {section !== 'own' && (
          <section className="catalog-page__intro">
            <h2 className="catalog-page__title">{pageTitle}</h2>
            <p className="catalog-page__description">{pageDescription}</p>
          </section>
        )}

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
              <span className="catalog-page__field-label">Categoría</span>
              <select
                className="catalog-page__select"
                value={filters.category}
                onChange={(e) => {
                  const value = e.target.value;
                  const category: FragranceCategory | 'all' =
                    value === 'masculine' || value === 'feminine' || value === 'unisex' ? value : 'all';
                  setFilters((f) => ({ ...f, category }));
                }}
              >
                <option value="all">Todas</option>
                <option value="masculine">{FRAGRANCE_CATEGORY_LABELS.masculine}</option>
                <option value="feminine">{FRAGRANCE_CATEGORY_LABELS.feminine}</option>
                <option value="unisex">{FRAGRANCE_CATEGORY_LABELS.unisex}</option>
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

        <section className="catalog-page__results" aria-live="polite" aria-busy={isLoading}>
          {isLoading && <p className="catalog-page__status">Cargando catálogo de demostración...</p>}
          {!isLoading && error && (
            <div className="catalog-page__status catalog-page__status--error" role="alert">
              <p>Error: {error}</p>
            </div>
          )}
          {!isLoading && !error && items.length === 0 && (
            <div className="catalog-page__status">
              <p>No se encontraron productos con los filtros aplicados.</p>
              {hasActiveFilters && (
                <button type="button" className="catalog-page__reset" onClick={resetFilters}>
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
          {!isLoading && !error && items.length > 0 && (
            <div className="catalog-page__grid">
              {items.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
