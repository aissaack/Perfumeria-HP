import type { FragranceWithPresentations } from '../../../types/catalog';
import { FRAGRANCE_CATEGORY_LABELS } from '../../../types/catalog';
import { formatArs } from '../../../utils/formatCurrency';
import { PresentationList } from './PresentationList';
import { FICTIONAL_UNISEX_ID } from '../../../data/demo/huelepectacular-line';
import './ProductCard.css';

interface ProductCardProps {
  item: FragranceWithPresentations;
}

export function ProductCard({ item }: ProductCardProps) {
  const prices = item.presentations.flatMap((p) => p.priceArs === null ? [] : [p.priceArs]);
  const minPrice = prices.length ? Math.min(...prices) : null;

  return (
    <article className="product-card" aria-labelledby={`frag-${item.id}-title`}>
      <header className="product-card__header">
        <div className="product-card__meta">
          <p className="product-card__brand">{item.brand.name}</p>
          <h2 id={`frag-${item.id}-title`} className="product-card__title">{item.name}</h2>
          {item.family && <p className="product-card__family">{item.section === 'own' ? (item.id === FICTIONAL_UNISEX_ID ? 'Familia ficticia de demostración: ' : 'Familia orientativa, pendiente de validación: ') : ''}{item.family}</p>}
          <p className="product-card__category">Categoría: {FRAGRANCE_CATEGORY_LABELS[item.category]} · Demo</p>
        </div>
        {minPrice !== null && (
          <div className="product-card__price-range">
            <span className="product-card__price-label">Desde · precio ficticio</span>
            <span className="product-card__price-value">{formatArs(minPrice)}</span>
          </div>
        )}
      </header>

      {item.description && <p className="product-card__desc">{item.description}</p>}
      {item.notes && item.notes.length > 0 && (
        <p className="product-card__notes">
          <span className="product-card__notes-label">Notas:</span> {item.notes.join(', ')}
        </p>
      )}

      <section className="product-card__presentations" aria-label="Presentaciones">
        <h3 className="product-card__section-title">Presentaciones · precios ficticios</h3>
        <PresentationList presentations={item.presentations} />
      </section>
    </article>
  );
}
