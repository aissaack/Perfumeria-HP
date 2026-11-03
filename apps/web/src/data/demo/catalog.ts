// Datos de demostración - claramente marcados como tales
// No representan stock/precios/ventas reales

import type { Brand, Fragrance, FragranceWithPresentations, ProductPresentation } from '../../types/catalog';
import { HUELEPECTACULAR_FRAGRANCES, HUELEPECTACULAR_PRESENTATIONS } from './huelepectacular-line';

export const DEMO_BRANDS: Brand[] = [
  { id: 'demo-brand-1', name: 'Maison Demo' },
  { id: 'demo-brand-2', name: 'Atelier Ficticio' },
  { id: 'demo-brand-3', name: 'Oasis Árabe (Demo)' },
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
];

// Marcas de referencia; productos y precios son ficticios.
const REFERENCE_EXAMPLES = [
  { brand: 'Mykonos', classifications: [] as string[], segments: [] as string[], sizes: [50, 100] },
  { brand: 'JO Milano', classifications: ['Diseñador'], segments: [], sizes: [100] },
  { brand: 'Bharara', classifications: [], segments: [], sizes: [100] },
  { brand: 'Extracto Importado', classifications: ['Nacionales'], segments: [], sizes: [50] },
  { brand: 'Yves d’Orgeval', classifications: ['Nacionales'], segments: [], sizes: [100] },
  { brand: 'Milano', classifications: ['Nacionales'], segments: [], sizes: [100] },
];
REFERENCE_EXAMPLES.forEach((example, index) => {
  const id = `demo-reference-${index}`;
  DEMO_FRAGRANCES.push({ id, name: `Fragancia ficticia ${index + 1}`, brand: { id, name: example.brand }, category: 'unisex', family: 'Cítrico aromático', classifications: example.classifications, segments: example.segments, isDemoOffer: index === 0, isDemoData: true, section: 'general' });
  [...example.sizes.map((sizeMl) => ({ format: 'bottle' as const, sizeMl })), { format: 'decant' as const, sizeMl: 5 }].forEach(({ format, sizeMl }) => {
    DEMO_PRESENTATIONS.push({ id: `${id}-${format}-${sizeMl}`, fragranceId: id, format, sizeMl, priceArs: format === 'decant' ? 8000 : 40000, currency: 'ARS', isDemoData: true });
  });
});
DEMO_FRAGRANCES.find((item) => item.id === 'demo-frag-1')!.classifications = ['Diseñador'];
DEMO_FRAGRANCES.find((item) => item.id === 'demo-frag-3')!.classifications = ['Árabes'];
DEMO_FRAGRANCES.find((item) => item.id === 'demo-frag-2')!.segments = ['Low/Mid Cost'];
DEMO_FRAGRANCES.find((item) => item.id === 'demo-frag-2')!.classifications = ['Varios'];

// Datos aportados para referencia; no confirman disponibilidad ni precios de las presentaciones.
const NICHE_REFERENCES: Array<{ brand: string; name: string; category: Fragrance['category']; description: string; bottleSizes: number[] }> = [
  { brand: 'Tom Ford', name: 'Tobacco Vanille', category: 'unisex', description: 'Oriental especiada tipo gourmand: tabaco y especias sobre vainilla, cacao y haba tonka.', bottleSizes: [30, 50, 100] },
  { brand: 'Creed', name: 'Aventus', category: 'masculine', description: 'Chipre frutal amaderada: frutas sobre abedul, almizcle y musgo de roble.', bottleSizes: [30, 50, 100, 250] },
  { brand: 'Nishane', name: 'Ani Extrait de Parfum', category: 'unisex', description: 'Oriental gourmand y especiada: vainilla, ámbar y especias.', bottleSizes: [50, 100] },
  { brand: 'Lorenzo Pazzaglia', name: 'Sun-Gria Extrait de Parfum', category: 'unisex', description: 'Frutal amaderada con toque gourmand: cítricos y frutas sobre vainilla y maderas.', bottleSizes: [28, 50] },
  { brand: 'Solonoi (Maison Crivelli)', name: 'Rose Saltifolia', category: 'feminine', description: 'Floral marina: rosa, notas salinas, cítricos y buganvilia.', bottleSizes: [100] },
  { brand: 'Xerjoff', name: 'Erba Pura', category: 'unisex', description: 'Cítrica y frutal con fondo ámbar-almizclado: naranja, limón y frutas mediterráneas.', bottleSizes: [50, 100] },
  { brand: 'Maison Margiela', name: 'Replica Lazy Sunday Morning', category: 'feminine', description: 'Floral almizclada: lirio de los valles, iris, rosa y almizcles blancos.', bottleSizes: [30, 100] },
  { brand: 'Parfums de Marly', name: 'Layton', category: 'masculine', description: 'Oriental floral aromática: manzana, lavanda y bergamota sobre vainilla, cardamomo y sándalo.', bottleSizes: [75, 125, 200] },
  { brand: 'Montale', name: 'Roses Musk', category: 'feminine', description: 'Floral amaderada almizclada: rosa búlgara con almizcle blanco y ámbar.', bottleSizes: [50, 100] },
];
NICHE_REFERENCES.forEach((reference, index) => {
  const id = `niche-reference-${index + 1}`;
  DEMO_FRAGRANCES.push({ id, name: reference.name, brand: { id: `${id}-brand`, name: reference.brand }, category: reference.category, description: `Descripción orientativa, pendiente de validación: ${reference.description}`, segments: ['Nicho'], isDemoData: true, section: 'general' });
  reference.bottleSizes.forEach((sizeMl) => DEMO_PRESENTATIONS.push({ id: `${id}-bottle-${sizeMl}`, fragranceId: id, format: 'bottle', sizeMl, priceArs: null, currency: 'ARS', isDemoData: true }));
  DEMO_PRESENTATIONS.push({ id: `${id}-decant-5`, fragranceId: id, format: 'decant', sizeMl: 5, priceArs: null, currency: 'ARS', isDemoData: true });
});

export function getDemoCatalog(): FragranceWithPresentations[] {
  return DEMO_FRAGRANCES.map((frag) => ({
    ...frag,
    section: frag.section || 'general',
    presentations: DEMO_PRESENTATIONS.filter((p) => p.fragranceId === frag.id).sort((a, b) => {
      // Botellas primero, luego decants por tamaño
      if (a.format === 'bottle' && b.format !== 'bottle') return -1;
      if (b.format === 'bottle' && a.format !== 'bottle') return 1;
      if (a.sizeMl !== null && b.sizeMl !== null) return a.sizeMl - b.sizeMl;
      return (a.priceArs ?? 0) - (b.priceArs ?? 0);
    }),
  }));
}

export const DEMO_CATALOG = getDemoCatalog();
