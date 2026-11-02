import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { OwnPresentationCard } from '../features/catalog/components/OwnPresentationCard';
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

function buildFilterParams(filters: Omit<CatalogFilters, 'section'>): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set('q', filters.query.trim());
  if (filters.brandId) params.set('brand', filters.brandId);
  if (filters.family) params.set('family', filters.family);
  if (filters.category !== 'all') params.set('category', filters.category);
  if (filters.format !== 'all') params.set('format', filters.format);
  return params;
}

interface CatalogPageProps {
  section?: 'own' | 'general';
  title?: string;
  description?: string;
}

export function CatalogPage({ section = 'general', title, description }: CatalogPageProps = {}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
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
      brandId: section === 'general' && brandId && brandId.trim() ? brandId : null,
      family: section === 'general' && family && family.trim() ? family : null,
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
    setSearchParams(buildFilterParams(filters), { replace: true });
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

  const activeFilterCount = Number(filters.brandId !== null) + Number(filters.family !== null) + Number(filters.category !== 'all') + Number(filters.format !== 'all');

  function closeFilters() {
    setFiltersOpen(false);
    filterButtonRef.current?.focus();
  }

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
      <Header demoLabel="Datos de demostración — Nivel 1" searchValue={filters.query} onSearchChange={(query) => setFilters((current) => ({ ...current, query }))} />

      <main className="catalog-page__main">
        {section === 'own' && (
          <section className="own-hero">
            <div className="own-hero__header">
              <p className="own-hero__eyebrow">Colección exclusiva · Huelepectacular</p>
              <h2 className="own-hero__title">Perfumes Huelepectacular</h2>
              <p className="own-hero__subtitle">Conocé la línea propia y explorá sus presentaciones en esta demostración.</p>
            </div>
            <div className="own-hero__grid">
              <article className="own-hero__panel own-hero__panel--violet">
                <div className="own-hero__panel-inner">
                  <div className="own-hero__panel-meta">
                    <span className="own-hero__pill">Creación propia</span>
                    <span className="own-hero__pill own-hero__pill--gold">Línea exclusiva</span>
                  </div>
                  <h3 className="own-hero__panel-title">Línea propia</h3>
                  <p className="own-hero__panel-subtitle">Cinco fragancias documentadas · Demostración</p>
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
                  <h3 className="own-hero__panel-title">Explorá formatos</h3>
                  <p className="own-hero__panel-subtitle">Botellas y decants · Precios ficticios</p>
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

        <section className="catalog-page__filters" aria-label="Filtros del catálogo" onKeyDown={(event) => { if (event.key === 'Escape' && filtersOpen) { event.stopPropagation(); closeFilters(); } }}>
          <button ref={filterButtonRef} type="button" className="catalog-page__filters-toggle" aria-expanded={filtersOpen} aria-controls="catalog-filters-panel" onClick={() => setFiltersOpen((open) => !open)}>
            Filtros{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>
          <div id="catalog-filters-panel" className={`catalog-page__filters-panel${filtersOpen ? ' catalog-page__filters-panel--open' : ''}`}>
          <div className={`catalog-page__filter-row catalog-page__filter-row--grid${section === 'own' ? ' catalog-page__filter-row--own' : ''}`}>
            {section === 'general' && (
              <>
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
              </>
            )}

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
          <button type="button" className="catalog-page__filters-close" onClick={closeFilters}>Cerrar filtros</button>
          </div>
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
            <div className={`catalog-page__grid ${section === 'own' ? 'catalog-page__grid--own' : 'catalog-page__grid--general-presentations'}`}>
              {items.flatMap((item) => item.presentations
                    .filter((presentation) => filters.format === 'all' || presentation.format === filters.format)
                    .map((presentation) => (
                      <OwnPresentationCard key={presentation.id} item={item} presentation={presentation} section={section} returnSearch={buildFilterParams(filters).toString() ? `?${buildFilterParams(filters)}` : ''} />
                    )))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
