import { useState } from 'react';
import { FICTIONAL_UNISEX_ID } from '../../../data/demo/huelepectacular-line';
import { FRAGRANCE_CATEGORY_LABELS } from '../../../types/catalog';
import type { FragranceWithPresentations, ProductPresentation } from '../../../types/catalog';
import { formatArs } from '../../../utils/formatCurrency';
import './OwnPresentationCard.css';

interface OwnPresentationCardProps {
  item: FragranceWithPresentations;
  presentation: ProductPresentation;
}

export function OwnPresentationCard({ item, presentation }: OwnPresentationCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const format = presentation.format === 'bottle' ? 'Botella completa' : presentation.format === 'decant' ? 'Decant' : 'Presentación';
  const presentationLabel = `${format}${presentation.sizeMl !== null ? ` · ${presentation.sizeMl} ml` : ''}`;
  const titleId = `presentation-${presentation.id}-title`;
  const showImage = presentation.imageUrl && presentation.imageUrl !== failedImageUrl;

  return (
    <article className="own-presentation-card" aria-labelledby={titleId}>
      <div className="own-presentation-card__image">
        {showImage ? (
          <img src={presentation.imageUrl} alt={`Imagen de ejemplo de ${item.name} — ${presentationLabel}`} onError={() => setFailedImageUrl(presentation.imageUrl ?? null)} />
        ) : <span>Imagen pendiente</span>}
      </div>
      <div className="own-presentation-card__content">
        {showImage && <p>Imagen de ejemplo · no representa el producto real</p>}
        <p className="own-presentation-card__brand">{item.brand.name}</p>
        <h2 id={titleId}>{item.name}</h2>
        <p className="own-presentation-card__format">{presentationLabel}</p>
        <p>Categoría: {FRAGRANCE_CATEGORY_LABELS[item.category]} · Demo</p>
        {item.family && <p>{item.id === FICTIONAL_UNISEX_ID ? 'Familia ficticia de demostración: ' : 'Familia orientativa, pendiente de validación: '}{item.family}</p>}
        {item.description && <p>{item.description}</p>}
        <div className="own-presentation-card__price">
          <span>Precio ficticio de demostración</span>
          <strong>{formatArs(presentation.priceArs)}</strong>
        </div>
      </div>
    </article>
  );
}
