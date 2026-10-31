// Datos de demostración - claramente marcados como tales
// No representan stock/precios/ventas reales

import type { Brand, Fragrance, FragranceWithPresentations, ProductPresentation } from '../../types/catalog';
import { HUELEPECTACULAR_FRAGRANCES, HUELEPECTACULAR_PRESENTATIONS } from './huelepectacular-line';

export const DEMO_BRANDS: Brand[] = [
  { id: 'demo-brand-1', name: 'Maison Demo' },
  { id: 'demo-brand-2', name: 'Atelier Ficticio' },
  { id: 'demo-brand-3', name: 'Oasis Árabe (Demo)' },
  { id: 'demo-brand-4', name: 'Nicho Ejemplo' },
  { id: 'demo-brand-own', name: 'Huelepectacular' },
];

export const DEMO_FRAGRANCES: Fragrance[] = [
  ...HUELEPECTACULAR_FRAGRANCES,
  {
    id: 'demo-frag-1',
    name: 'Ámbar Cálido',
    brand: DEMO_BRANDS[0],
    category: 'masculine',
    family: 'Ámbar amaderado',
    notes: ['Ámbar', 'Vainilla', 'Cedro'],
    description: 'Fragancia de demostración con perfil cálido y envolvente.',
    isDemoData: true,
    section: 'general',
  },
  {
    id: 'demo-frag-2',
    name: 'Cítricos Frescos',
    brand: DEMO_BRANDS[1],
    category: 'unisex',
    family: 'Cítrico aromático',
    notes: ['Bergamota', 'Naranja dulce', 'Romero'],
    description: 'Fragancia de demostración ideal para uso diario.',
    isDemoData: true,
    section: 'general',
  },
  {
    id: 'demo-frag-3',
    name: 'Oud Intenso',
    brand: DEMO_BRANDS[2],
    category: 'masculine',
    family: 'Oriental amaderado',
    notes: ['Oud', 'Rosa', 'Pachuli'],
    description: 'Fragancia de demostración con carácter intenso.',
    isDemoData: true,
    section: 'general',
  },
  {
    id: 'demo-frag-4',
    name: 'Floral Especiado',
    brand: DEMO_BRANDS[3],
    category: 'feminine',
    family: 'Floral especiado',
    notes: ['Jazmín', 'Canela', 'Sándalo'],
    description: 'Fragancia de demostración de carácter nicho.',
    isDemoData: true,
    section: 'general',
  },
];

export const DEMO_PRESENTATIONS: ProductPresentation[] = [
  ...HUELEPECTACULAR_PRESENTATIONS,
  // Ámbar Cálido
  { id: 'demo-pres-1a', fragranceId: 'demo-frag-1', format: 'bottle', sizeMl: 100, priceArs: 45990, currency: 'ARS', isDemoData: true },
  { id: 'demo-pres-1b', fragranceId: 'demo-frag-1', format: 'decant', sizeMl: 5, priceArs: 7990, currency: 'ARS', isDemoData: true },
  { id: 'demo-pres-1c', fragranceId: 'demo-frag-1', format: 'decant', sizeMl: 10, priceArs: 13990, currency: 'ARS', isDemoData: true },
  // Cítricos Frescos
  { id: 'demo-pres-2a', fragranceId: 'demo-frag-2', format: 'bottle', sizeMl: 50, priceArs: 29990, currency: 'ARS', isDemoData: true },
  { id: 'demo-pres-2b', fragranceId: 'demo-frag-2', format: 'decant', sizeMl: 5, priceArs: 5990, currency: 'ARS', isDemoData: true },
  // Oud Intenso
  { id: 'demo-pres-3a', fragranceId: 'demo-frag-3', format: 'bottle', sizeMl: 100, priceArs: 89990, currency: 'ARS', isDemoData: true },
  { id: 'demo-pres-3b', fragranceId: 'demo-frag-3', format: 'decant', sizeMl: 5, priceArs: 14990, currency: 'ARS', isDemoData: true },
  { id: 'demo-pres-3c', fragranceId: 'demo-frag-3', format: 'decant', sizeMl: 10, priceArs: 27990, currency: 'ARS', isDemoData: true },
  // Floral Especiado
  { id: 'demo-pres-4a', fragranceId: 'demo-frag-4', format: 'bottle', sizeMl: 75, priceArs: 64990, currency: 'ARS', isDemoData: true },
  { id: 'demo-pres-4b', fragranceId: 'demo-frag-4', format: 'decant', sizeMl: 5, priceArs: 10990, currency: 'ARS', isDemoData: true },
];

export function getDemoCatalog(): FragranceWithPresentations[] {
  return DEMO_FRAGRANCES.map((frag) => ({
    ...frag,
    section: frag.section || 'general',
    presentations: DEMO_PRESENTATIONS.filter((p) => p.fragranceId === frag.id).sort((a, b) => {
      // Botellas primero, luego decants por tamaño
      if (a.format === 'bottle' && b.format !== 'bottle') return -1;
      if (b.format === 'bottle' && a.format !== 'bottle') return 1;
      if (a.sizeMl !== null && b.sizeMl !== null) return a.sizeMl - b.sizeMl;
      return a.priceArs - b.priceArs;
    }),
  }));
}

export const DEMO_CATALOG = getDemoCatalog();
