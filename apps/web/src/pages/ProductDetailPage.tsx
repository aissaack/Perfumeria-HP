import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FICTIONAL_UNISEX_ID } from '../data/demo/huelepectacular-line';
import { NICHE_CARD_IMAGES } from '../data/demo/nicheCardImages';
import { demoCatalogRepository } from '../services/catalog/demoCatalogRepository';
import { FRAGRANCE_CATEGORY_LABELS } from '../types/catalog';
import type { FragranceWithPresentations, ProductPresentation } from '../types/catalog';
import { formatArs } from '../utils/formatCurrency';
import './ProductDetailPage.css';

function formatPresentation(presentation: ProductPresentation) {
  const format = presentation.format === 'bottle' ? 'Botella completa' : presentation.format === 'decant' ? 'Decant' : 'Presentación';
  return `${format}${presentation.sizeMl !== null ? ` · ${presentation.sizeMl} ml` : ''}`;
}

export function ProductDetailPage({ section = 'own', niche = false }: { section?: 'own' | 'general'; niche?: boolean }) {
  const { presentationId = '' } = useParams();
  const location = useLocation();
  const requestedReturn = new URLSearchParams(location.search).get('volver');
  const returnSearch = requestedReturn?.startsWith('?') ? requestedReturn : '';
  const [item, setItem] = useState<FragranceWithPresentations | null>(null);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    demoCatalogRepository.getByPresentationId(presentationId).then((result) => {
      if (!cancelled) { setItem(result?.section === section ? result : null); setError(false); setLoadedId(presentationId); }
    }).catch(() => {
      if (!cancelled) { setItem(null); setError(true); setLoadedId(presentationId); }
    });
    return () => { cancelled = true; };
  }, [presentationId, section]);

  const presentation = item?.presentations.find((entry) => entry.id === presentationId);
  const isLoading = loadedId !== presentationId;
  const imageUrl = niche && presentation ? NICHE_CARD_IMAGES[presentation.id] : presentation?.imageUrl;
  const showImage = imageUrl && imageUrl !== failedImageUrl;
  const catalogPath = section === 'own' ? '/perfumes-huelepectacular' : niche ? '/catalogo/nicho' : '/catalogo';
  const backLink = `${catalogPath}${returnSearch}`;
  const ownCatalogScrollY: unknown = location.state?.ownCatalogScrollY;
  const returnState = section === 'own' && typeof ownCatalogScrollY === 'number' && Number.isFinite(ownCatalogScrollY) && ownCatalogScrollY >= 0
    ? { ownCatalogScrollY } : undefined;

  return (
    <div className={`product-detail${section === 'own' ? ' catalog-page--own-theme' : ''}`}>
      <Header demoLabel="Datos de demostración — Nivel 1" />
      <main className="product-detail__main">
        <Link className="product-detail__back" to={backLink} state={returnState}>← Volver a {section === 'own' ? 'Perfumes Huelepectacular' : niche ? 'Nicho' : 'Catálogo'}</Link>
        {isLoading && <p role="status">Cargando producto de demostración...</p>}
        {!isLoading && error && <p role="alert">No pudimos cargar el producto. Volvé al catálogo e intentá de nuevo.</p>}
        {!isLoading && !error && (!item || !presentation) && <p role="status">No encontramos esta presentación en el catálogo de demostración.</p>}
        {!isLoading && !error && item && presentation && (
          <article className="product-detail__layout">
            <div className="product-detail__media">
              {showImage ? <img src={imageUrl} alt={`Imagen de ejemplo de ${item.name} — ${formatPresentation(presentation)}`} onError={() => setFailedImageUrl(imageUrl)} /> : <span>Imagen pendiente</span>}
            </div>
            <div className="product-detail__content">
              {showImage && <p className="product-detail__note">Imagen de ejemplo · no representa el producto real</p>}
              <p className="product-detail__brand">{item.brand.name}</p>
              <h1>{item.name}</h1>
              <p className="product-detail__format">{formatPresentation(presentation)}</p>
              <div>{presentation.priceArs === null ? <span>Precio pendiente de confirmación</span> : <><span>Precio ficticio de demostración</span><strong className="product-detail__price">{formatArs(presentation.priceArs)}</strong></>}</div>
              <p>Categoría: {FRAGRANCE_CATEGORY_LABELS[item.category]} · Demo</p>
              {item.family && <p>{section === 'general' ? 'Familia olfativa: ' : item.id === FICTIONAL_UNISEX_ID ? 'Familia ficticia de demostración: ' : 'Familia orientativa, pendiente de validación: '}{item.family}</p>}
              {item.description && <p>{item.description}</p>}
              {item.notes && item.notes.length > 0 && <p>Notas: {item.notes.join(', ')}</p>}
              {item.presentations.length > 1 && <section aria-labelledby="presentation-options">
                <h2 id="presentation-options">Presentaciones</h2>
                <div className="product-detail__options">
                  {item.presentations.map((option) => <Link key={option.id} className="product-detail__option" aria-current={option.id === presentationId ? 'page' : undefined} to={{ pathname: `${catalogPath}/producto/${encodeURIComponent(option.id)}`, search: location.search }} state={returnState}>{formatPresentation(option)}</Link>)}
                </div>
              </section>}
            </div>
          </article>
        )}
      </main>
      <Footer />
    </div>
  );
}
