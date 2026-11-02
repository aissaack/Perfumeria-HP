import { useState } from 'react';
import { Link } from 'react-router';
import type { FragranceWithPresentations, ProductPresentation } from '../../../types/catalog';
import { formatArs } from '../../../utils/formatCurrency';
import './OwnPresentationCard.css';

interface OwnPresentationCardProps {
  item: FragranceWithPresentations;
  presentation: ProductPresentation;
  returnSearch: string;
  section?: 'own' | 'general';
}

export function OwnPresentationCard({ item, presentation, returnSearch, section = 'own' }: OwnPresentationCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const format = presentation.format === 'bottle' ? 'Botella completa' : presentation.format === 'decant' ? 'Decant' : 'Presentación';
  const presentationLabel = `${format}${presentation.sizeMl !== null ? ` · ${presentation.sizeMl} ml` : ''}`;
  const showImage = presentation.imageUrl && presentation.imageUrl !== failedImageUrl;
  const params = new URLSearchParams();
  if (returnSearch) params.set('volver', returnSearch);
  const search = params.toString();

  return (
    <article className="own-presentation-card">
      <Link className="own-presentation-card__link" to={{ pathname: `${section === 'own' ? '/perfumes-huelepectacular' : '/catalogo'}/producto/${encodeURIComponent(presentation.id)}`, search: search ? `?${search}` : '' }} aria-label={`Ver detalle de ${item.name}, ${presentationLabel}`}>
        <div className="own-presentation-card__image">
          {showImage ? <img src={presentation.imageUrl} alt="" onError={() => setFailedImageUrl(presentation.imageUrl ?? null)} /> : <span>Imagen pendiente</span>}
        </div>
        <div className="own-presentation-card__content">
          {showImage && <span className="own-presentation-card__disclaimer">Imagen de ejemplo</span>}
          {section === 'general' && <span className="own-presentation-card__disclaimer">{item.brand.name}</span>}
          <h2>{item.name}</h2>
          <p>{presentationLabel}</p>
          <span className="own-presentation-card__price-label">Precio ficticio</span>
          <strong>{formatArs(presentation.priceArs)}</strong>
        </div>
      </Link>
    </article>
  );
}
