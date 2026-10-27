// Tipos normalizados para el catálogo de demostración (Nivel 1)
// Siguen la separación perfume/fragrancia vs presentación vendible

export type ProductFormat = 'bottle' | 'decant' | 'other';

export interface Brand {
  id: string;
  name: string;
}

export interface Fragrance {
  id: string;
  name: string;
  brand: Brand;
  family?: string; // familia olfativa (opcional)
  notes?: string[]; // notas opcionales
  description?: string;
  isDemoData: boolean;
}

export interface ProductPresentation {
  id: string;
  fragranceId: string;
  format: ProductFormat;
  sizeMl: number | null;
  priceArs: number; // precio ficticio para demo
  currency: 'ARS';
  isDemoData: boolean;
}

export interface FragranceWithPresentations extends Fragrance {
  presentations: ProductPresentation[];
}

export interface CatalogFilters {
  query: string;
  brandId: string | null;
  format: ProductFormat | 'all';
  family: string | null;
}

export const DEFAULT_FILTERS: CatalogFilters = {
  query: '',
  brandId: null,
  format: 'all',
  family: null,
};
