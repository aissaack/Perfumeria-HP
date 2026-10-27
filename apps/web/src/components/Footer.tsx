import './Footer.css';

export function Footer() {
  return (
    <footer className="hp-footer">
      <div className="hp-footer__container">
        <div className="hp-footer__content">
          <div>
            <p className="hp-footer__brand">Huelepectacular</p>
            <p className="hp-footer__text">Prototipo de demostración · Datos ficticios.</p>
          </div>
          <p className="hp-footer__disclaimer">
            No es el sitio de Pedix. Esta propuesta es únicamente para evaluación visual y de experiencia.
          </p>
        </div>
      </div>
    </footer>
  );
}
