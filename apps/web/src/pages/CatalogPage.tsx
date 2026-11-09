import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { OwnPresentationCard } from '../features/catalog/components/OwnPresentationCard';
import { demoCatalogRepository } from '../services/catalog/demoCatalogRepository';
import { getSearchSection } from '../services/catalog/searchCatalog';
import type { CatalogFilters, FragranceCategory, FragranceWithPresentations, ProductFormat } from '../types/catalog';
import { DEFAULT_FILTERS, FRAGRANCE_CATEGORY_LABELS } from '../types/catalog';
import './CatalogPage.css';

const FORMAT_OPTIONS: Array<{ value: ProductFormat | 'all'; label: string }> = [
  { value: 'all', label: 'Todos' },
  { value: 'bottle', label: 'Botella completa' },
  { value: 'decant', label: 'Decant' },
];
const CLASSIFICATION_ORDER = ['Diseñador', 'Árabes', 'Nacionales'];
const SEGMENT_ORDER = ['Varios', 'Low/Mid Cost', 'Inspiraciones/Dupes'];

function buildFilterParams(filters: Omit<CatalogFilters, 'section'>): URLSearchParams {
  const params = new URLSearchParams();
  if (filters.classification) params.set('classification', filters.classification);
  if (filters.segment) params.set('segment', filters.segment);
  if (filters.sizeMl !== null) params.set('size', String(filters.sizeMl));
  if (filters.offer) params.set('offer', '1');
  if (filters.query.trim()) params.set('q', filters.query.trim());
  if (filters.brandId) params.set('brand', filters.brandId);
  if (filters.category !== 'all') params.set('category', filters.category);
  if (filters.format !== 'all') params.set('format', filters.format);
  return params;
}

interface CatalogPageProps {
  section?: 'own' | 'general';
  title?: string;
  description?: string;
  niche?: boolean;
}

export function CatalogPage({ section = 'general', title, description, niche = false }: CatalogPageProps = {}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const filterButtonRef = useRef<HTMLButtonElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = useMemo<Omit<CatalogFilters, 'section'>>(() => {
    const query = searchParams.get('q') || '';
    const brandId = searchParams.get('brand');
    const category = searchParams.get('category');
    const format = searchParams.get('format') as ProductFormat | 'all' | null;
    const classification = searchParams.get('classification');
    const segment = searchParams.get('segment');
    const legacyVarios = classification === 'Varios' && (!segment || segment === 'Varios');
    return {
      ...DEFAULT_FILTERS,
      query,
      classification: section === 'general' && !niche && !legacyVarios ? classification : null,
      segment: section === 'general' && !niche ? (legacyVarios ? 'Varios' : segment) : null,
      sizeMl: section === 'general' && Number(searchParams.get('size')) > 0 ? Number(searchParams.get('size')) : null,
      offer: section === 'general' && searchParams.get('offer') === '1',
      brandId: section === 'general' && brandId && brandId.trim() ? brandId : null,
      category: category === 'masculine' || category === 'feminine' || category === 'unisex' ? category : 'all',
      format: format === 'bottle' || format === 'decant' || format === 'all' ? format : 'all',
    };
  }, [searchParams, section, niche]);
  function setFilters(update: Omit<CatalogFilters, 'section'> | ((current: Omit<CatalogFilters, 'section'>) => Omit<CatalogFilters, 'section'>)) {
    const next = typeof update === 'function' ? update(filters) : update;
    setSearchParams(buildFilterParams(next));
  }
  const [options, setOptions] = useState<FragranceWithPresentations[]>([]);
  useEffect(() => {
    let active = true;
    demoCatalogRepository.list({ section }).then((results) => { if (active) setOptions(results.filter((item) => getSearchSection(item) === (section === 'own' ? 'own' : niche ? 'niche' : 'general'))); }).catch(() => { if (active) setOptions([]); });
    return () => { active = false; };
  }, [section, niche]);
  const brands = Array.from(new Map(options.map((item) => [item.brand.id, item.brand])).values());
  const availableClassifications = new Set(options.flatMap((item) => item.classifications ?? []));
  const availableSegments = new Set(options.flatMap((item) => item.segments ?? []));
  const classifications = CLASSIFICATION_ORDER.filter((value) => availableClassifications.has(value));
  const segments = SEGMENT_ORDER.filter((value) => availableSegments.has(value));
  const sizes = [...new Set(options.flatMap((item) => item.presentations.flatMap((presentation) => presentation.sizeMl === null ? [] : [presentation.sizeMl])))].sort((a, b) => a - b);
  const [items, setItems] = useState<FragranceWithPresentations[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadedSection, setLoadedSection] = useState<CatalogPageProps['section']>();
  const isLoading = loading || loadedSection !== section;

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await demoCatalogRepository.list({ ...filters, section });
        if (!cancelled) {
          setItems(results.filter((item) => getSearchSection(item) === (section === 'own' ? 'own' : niche ? 'niche' : 'general')));
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
  }, [filters, section, niche]);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.query.trim() !== '' || filters.classification !== null || filters.segment !== null || filters.sizeMl !== null || filters.offer ||
      filters.brandId !== null ||
      filters.category !== 'all' ||
      filters.format !== 'all'
    );
  }, [filters]);

  const activeFilterCount = Number(filters.classification !== null) + Number(filters.segment !== null) + Number(filters.sizeMl !== null) + Number(filters.offer) + Number(filters.brandId !== null) + Number(filters.category !== 'all') + Number(filters.format !== 'all');

  function closeFilters() {
    setFiltersOpen(false);
    filterButtonRef.current?.focus();
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  const pageTitle = title || (niche ? 'Perfumería de nicho' : section === 'own' ? 'Perfumes Huelepectacular' : 'Catálogo');
  const pageDescription =
    description ||
    (niche ? 'Explorá esta selección de demostración. Las referencias no confirman disponibilidad ni precios actuales.' : section === 'own'
      ? 'Línea propia de demostración. Productos de Huelepectacular, separados del catálogo general.'
      : 'Explorá referencias y presentaciones de demostración. Los precios ficticios y las ofertas no son reales.');

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
          <section className={`catalog-page__intro${niche ? ' catalog-page__intro--niche' : ''}`}>
            {niche && <p className="catalog-page__niche-label">Selección de demostración</p>}
            <h1 className="catalog-page__title">{pageTitle}</h1>
            <p className="catalog-page__description">{pageDescription}</p>
          </section>
        )}

        {niche && <Link to="/catalogo">← Volver al catálogo general</Link>}
        {section === 'general' && <nav className="catalog-page__quick" aria-label="Explorar por formato">
          {FORMAT_OPTIONS.map((option) => <button key={option.value} type="button" aria-pressed={filters.format === option.value} onClick={() => setFilters((current) => ({ ...current, format: option.value }))}>{option.value === 'all' ? 'Todos los productos' : option.value === 'bottle' ? 'Perfumes completos' : 'Decants'}</button>)}
          <button type="button" aria-pressed={filters.offer} onClick={() => setFilters((current) => ({ ...current, offer: !current.offer }))}>Ofertas de demostración</button>
        </nav>}
        <div className={section === 'general' ? 'catalog-page__layout catalog-page__layout--general' : 'catalog-page__layout'}>
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
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </label>
                {!niche && <label className="catalog-page__field"><span className="catalog-page__field-label">Clasificación comercial</span><select className="catalog-page__select" value={filters.classification ?? ''} onChange={(e) => setFilters((f) => ({ ...f, classification: e.target.value || null }))}><option value="">Todas</option>{classifications.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>}
                {!niche && <label className="catalog-page__field"><span className="catalog-page__field-label">Segmento</span><select className="catalog-page__select" value={filters.segment ?? ''} onChange={(e) => setFilters((f) => ({ ...f, segment: e.target.value || null }))}><option value="">Todos</option>{segments.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>}
                <label className="catalog-page__field"><span className="catalog-page__field-label">Tamaño</span><select className="catalog-page__select" value={filters.sizeMl ?? ''} onChange={(e) => setFilters((f) => ({ ...f, sizeMl: e.target.value ? Number(e.target.value) : null }))}><option value="">Todos</option>{sizes.map((size) => <option key={size} value={size}>{size} ml</option>)}</select></label>
              </>
            )}

            <label className="catalog-page__field">
              <span className="catalog-page__field-label">Género</span>
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
                    .filter((presentation) => (filters.format === 'all' || presentation.format === filters.format) && (filters.sizeMl === null || presentation.sizeMl === filters.sizeMl))
                    .map((presentation) => (
                      <OwnPresentationCard key={presentation.id} item={item} presentation={presentation} section={section} niche={niche} returnSearch={buildFilterParams(filters).toString() ? `?${buildFilterParams(filters)}` : ''} />
                    )))}
            </div>
          )}
        </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
