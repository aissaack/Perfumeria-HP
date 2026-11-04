import { useState } from 'react';
import { Link } from 'react-router';
import type { FragranceWithPresentations, ProductPresentation } from '../../../types/catalog';
import { NICHE_CARD_IMAGES } from '../../../data/demo/nicheCardImages';
import { formatArs } from '../../../utils/formatCurrency';
import './OwnPresentationCard.css';

interface OwnPresentationCardProps {
  item: FragranceWithPresentations;
  presentation: ProductPresentation;
  returnSearch: string;
  section?: 'own' | 'general';
  niche?: boolean;
}

export function OwnPresentationCard({ item, presentation, returnSearch, section = 'own', niche = false }: OwnPresentationCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const format = presentation.format === 'bottle' ? 'Botella completa' : presentation.format === 'decant' ? 'Decant' : 'Presentación';
  const presentationLabel = `${format}${presentation.sizeMl !== null ? ` · ${presentation.sizeMl} ml` : ''}`;
  const imageUrl = niche ? NICHE_CARD_IMAGES[presentation.id] : presentation.imageUrl;
  const showImage = imageUrl && imageUrl !== failedImageUrl;
  const params = new URLSearchParams();
  if (returnSearch) params.set('volver', returnSearch);
  const search = params.toString();

  return (
    <article className={`own-presentation-card${section === 'general' ? ' own-presentation-card--general' : ''}`}>
      <Link className="own-presentation-card__link" to={{ pathname: `${section === 'own' ? '/perfumes-huelepectacular' : niche ? '/catalogo/nicho' : '/catalogo'}/producto/${encodeURIComponent(presentation.id)}`, search: search ? `?${search}` : '' }} aria-label={`Ver detalle de ${item.brand.name}, ${item.name}, ${presentationLabel}`}>
        <div className="own-presentation-card__image">
          {showImage ? <img src={imageUrl} alt="" onError={() => setFailedImageUrl(imageUrl ?? null)} /> : <span>Imagen pendiente</span>}
        </div>
        <div className="own-presentation-card__content">
          {showImage && <span className="own-presentation-card__disclaimer">Imagen de ejemplo</span>}
          {section === 'general' && <span className="own-presentation-card__brand">{item.brand.name}</span>}
          {item.isDemoOffer && <span className="own-presentation-card__disclaimer">Oferta ficticia de demostración</span>}
          <h2>{item.name}</h2>
          <p>{presentationLabel}</p>
          <span className="own-presentation-card__price-label">{presentation.priceArs === null ? 'Precio pendiente de confirmación' : 'Precio ficticio'}</span>
          {presentation.priceArs !== null && <strong>{formatArs(presentation.priceArs)}</strong>}
        </div>
      </Link>
    </article>
  );
}
