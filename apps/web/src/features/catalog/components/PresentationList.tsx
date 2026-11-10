import type { ProductPresentation } from '../../../types/catalog';
import { formatArs } from '../../../utils/formatCurrency';
import './PresentationList.css';

interface PresentationListProps {
  presentations: ProductPresentation[];
}

function formatLabel(p: ProductPresentation): string {
  if (p.format === 'bottle') {
    return p.sizeMl ? `Botella ${p.sizeMl} ml` : 'Botella completa';
  }
  if (p.format === 'decant') {
    return p.sizeMl ? `Decant ${p.sizeMl} ml` : 'Decant';
  }
  return p.sizeMl ? `${p.sizeMl} ml` : 'Presentación';
}

export function PresentationList({ presentations }: PresentationListProps) {
  if (presentations.length === 0) {
    return <p className="pres-list__empty">Sin presentaciones registradas en la demo.</p>;
  }

  return (
    <ul className="pres-list" aria-label="Presentaciones y precios ficticios de demostración">
      {presentations.map((p) => (
        <li key={p.id} className={`pres-list__item pres-list__item--${p.format}`}>
          <div className="pres-list__label">
            <span className="pres-list__format">{formatLabel(p)}</span>
            {p.format === 'decant' && <span className="pres-list__tag">Decant</span>}
            {p.format === 'bottle' && <span className="pres-list__tag pres-list__tag--bottle">Botella completa</span>}
          </div>
          <div className="pres-list__price">{p.priceArs === null ? 'Precio pendiente de confirmación' : formatArs(p.priceArs)}</div>
        </li>
      ))}
    </ul>
  );
}
