import './Header.css';

interface HeaderProps {
  demoLabel?: string;
}

export function Header({ demoLabel = 'Datos de demostración' }: HeaderProps) {
  return (
    <header className="hp-header">
      <div className="hp-header__container">
        <div className="hp-header__brand">
          <h1 className="hp-header__title">Huelepectacular</h1>
          <p className="hp-header__subtitle">Perfumería · Diseño, árabe, nicho y decants</p>
        </div>
        <div className="hp-header__demo" aria-label={demoLabel}>
          <span className="hp-header__demo-badge">{demoLabel}</span>
        </div>
      </div>
    </header>
  );
}
