// Tipos normalizados para el catálogo de demostración (Nivel 1)
// Siguen la separación perfume/fragrancia vs presentación vendible

export type ProductFormat = 'bottle' | 'decant' | 'other';

export type CatalogSection = 'own' | 'general';

export type FragranceCategory = 'masculine' | 'feminine' | 'unisex';

export const FRAGRANCE_CATEGORY_LABELS: Record<FragranceCategory, string> = {
  masculine: 'Masculino',
  feminine: 'Femenino',
  unisex: 'Unisex',
};

export interface Brand {
  id: string;
  name: string;
}

export interface Fragrance {
  id: string;
  name: string;
  brand: Brand;
  category: FragranceCategory;
  family?: string; // familia olfativa (opcional)
  notes?: string[]; // notas opcionales
  description?: string;
  isDemoData: boolean;
  classifications?: string[];
  segments?: string[];
  isDemoOffer?: boolean;
  section?: CatalogSection; // Sección: línea propia o catálogo general
}

export interface ProductPresentation {
  id: string;
  fragranceId: string;
  format: ProductFormat;
  sizeMl: number | null;
  imageUrl?: string;
  priceArs: number | null; // precio ficticio o pendiente de confirmación
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
  category: FragranceCategory | 'all';
  classification: string | null;
  segment: string | null;
  sizeMl: number | null;
  offer: boolean;
  section?: CatalogSection | 'all';
}

export const DEFAULT_FILTERS: Omit<CatalogFilters, 'section'> = {
  query: '',
  classification: null,
  segment: null,
  sizeMl: null,
  offer: false,
  brandId: null,
  format: 'all',
  category: 'all',
};
