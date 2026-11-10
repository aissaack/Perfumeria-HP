// Datos de demostración - claramente marcados como tales
// No representan stock/precios/ventas reales

import type { Brand, Fragrance, FragranceWithPresentations, ProductPresentation } from '../../types/catalog';
import { HUELEPECTACULAR_FRAGRANCES, HUELEPECTACULAR_PRESENTATIONS } from './huelepectacular-line';

export const DEMO_BRANDS: Brand[] = [
  { id: 'demo-brand-own', name: 'Huelepectacular' },
];

export const DEMO_FRAGRANCES: Fragrance[] = [
  ...HUELEPECTACULAR_FRAGRANCES,
];

export const DEMO_PRESENTATIONS: ProductPresentation[] = [
  ...HUELEPECTACULAR_PRESENTATIONS,
];

// Referencias aportadas para la demo; no confirman precios ni disponibilidad.
const GENERAL_REFERENCES: Array<{
  id: string; brandId: string; brand: string; name: string; category: Fragrance['category'];
  classifications?: string[]; segments?: string[];
  presentations: Array<{ format: 'bottle' | 'decant'; sizeMl: number; image: string }>;
}> = [
  { id: 'demo-lattafa-asad', brandId: 'demo-lattafa', brand: 'Lattafa', name: 'Asad', category: 'masculine', classifications: ['Árabes'], presentations: [
    { format: 'bottle', sizeMl: 100, image: 'Lattafa-asad-hombre-100ml.webp' }, { format: 'decant', sizeMl: 5, image: 'Lattafa-asad-hombre-decant-5ml.webp' },
  ] },
  { id: 'demo-lattafa-yara', brandId: 'demo-lattafa', brand: 'Lattafa', name: 'Yara', category: 'feminine', classifications: ['Árabes'], presentations: [
    { format: 'bottle', sizeMl: 100, image: 'Lattafa-yara-mujer-100ml.jpg' }, { format: 'decant', sizeMl: 5, image: 'Lattafa-yara-mujer-decant-5ml.jpg' },
  ] },
  { id: 'demo-armani-oud-royal', brandId: 'demo-armani', brand: 'Armani', name: 'Privé Oud Royal', category: 'unisex', classifications: ['Diseñador'], presentations: [
    { format: 'bottle', sizeMl: 100, image: 'armani-prive-oud-royal-unisex-100ml.avif' }, { format: 'decant', sizeMl: 5, image: 'armani-prive-oud-royal-unisex-decant-5ml.webp' },
  ] },
  { id: 'demo-armani-profondo', brandId: 'demo-armani', brand: 'Armani', name: 'Acqua di Giò Profondo', category: 'masculine', classifications: ['Diseñador'], presentations: [
    { format: 'bottle', sizeMl: 100, image: 'armani-aqua-di-gio-profondo-hombre-100ml.webp' }, { format: 'decant', sizeMl: 5, image: 'armani-aqua-di-gio-profondo-hombre-decant-5ml.webp' },
  ] },
  { id: 'demo-armani-power', brandId: 'demo-armani', brand: 'Armani', name: 'Power of You', category: 'feminine', classifications: ['Diseñador'], presentations: [
    { format: 'bottle', sizeMl: 50, image: 'armani-power-of-you-mujer-50ml.webp' }, { format: 'decant', sizeMl: 5, image: 'armani-power-of-you-mujer-decant-5ml.webp' },
  ] },
  { id: 'demo-reference-0', brandId: 'demo-reference-0', brand: 'Mykonos', name: 'Dreamscape', category: 'unisex', segments: ['Inspiraciones/Dupes'], presentations: [
    { format: 'bottle', sizeMl: 50, image: 'mykonos-dreamscape-unisex-50ml.webp' }, { format: 'decant', sizeMl: 5, image: 'mykonos-dreamscape-unisex-decant-5ml.webp' },
  ] },
  { id: 'demo-mykonos-inception', brandId: 'demo-reference-0', brand: 'Mykonos', name: 'Inception', category: 'masculine', segments: ['Inspiraciones/Dupes'], presentations: [
    { format: 'bottle', sizeMl: 50, image: 'mykonos-inception-hombre-50ml.webp' }, { format: 'decant', sizeMl: 5, image: 'mykonos-inception-hombre-decant-5ml.webp' },
  ] },
  { id: 'demo-reference-1', brandId: 'demo-reference-1', brand: 'JO Milano', name: 'Game of Spades King', category: 'masculine', segments: ['Inspiraciones/Dupes'], presentations: [
    { format: 'bottle', sizeMl: 100, image: 'jo-milano-games-of-spades-king-hombre-100ml.webp' },
  ] },
  { id: 'demo-reference-2', brandId: 'demo-reference-2', brand: 'Bharara', name: 'Double Bleu', category: 'masculine', segments: ['Inspiraciones/Dupes'], presentations: [
    { format: 'bottle', sizeMl: 100, image: 'bharara-double-bleu-hombre-100ml.jpeg' },
  ] },
  { id: 'demo-reference-3', brandId: 'demo-reference-3', brand: 'Extracto Importado', name: 'Spice Bomb', category: 'masculine', classifications: ['Nacionales'], presentations: [
    { format: 'bottle', sizeMl: 100, image: 'extracto-importado-spice-bomb-hombre-100ml.webp' },
  ] },
  { id: 'demo-reference-4', brandId: 'demo-reference-4', brand: 'Yves d’Orgeval', name: 'Good Boy', category: 'masculine', classifications: ['Nacionales'], presentations: [
    { format: 'bottle', sizeMl: 100, image: "yves-d'orgeval-good-boy-hombre-100ml.webp" },
  ] },
  { id: 'demo-reference-5', brandId: 'demo-reference-5', brand: 'Milano', name: '207', category: 'masculine', classifications: ['Nacionales'], segments: ['Varios', 'Low/Mid Cost'], presentations: [
    { format: 'bottle', sizeMl: 60, image: 'milano-207-hombre-60ml.jpg' },
  ] },
  { id: 'demo-town-man', brandId: 'demo-town-scent', brand: 'Town Scent', name: 'Man in Black', category: 'masculine', segments: ['Varios', 'Low/Mid Cost'], presentations: [
    { format: 'bottle', sizeMl: 100, image: 'town-scent-man-in-black-hombre-100ml.webp' },
  ] },
  { id: 'demo-town-perhaps', brandId: 'demo-town-scent', brand: 'Town Scent', name: 'Perhaps for Her', category: 'feminine', segments: ['Varios', 'Low/Mid Cost'], presentations: [
    { format: 'bottle', sizeMl: 100, image: 'town-scent-perhaps-for-her-mujer-100ml.webp' },
  ] },
];
GENERAL_REFERENCES.forEach((reference) => {
  DEMO_FRAGRANCES.push({ id: reference.id, name: reference.name, brand: { id: reference.brandId, name: reference.brand }, category: reference.category, classifications: reference.classifications, segments: reference.segments, isDemoData: true, section: 'general' });
  reference.presentations.forEach(({ format, sizeMl, image }) => {
    DEMO_PRESENTATIONS.push({ id: `${reference.id}-${format}-${sizeMl}`, fragranceId: reference.id, format, sizeMl, priceArs: null, currency: 'ARS', imageUrl: `${import.meta.env.BASE_URL}images/demo/CatalogoGeneraldemo/${image}`, isDemoData: true });
  });
});

// Datos aportados para referencia; no confirman disponibilidad ni precios de las presentaciones.
const NICHE_REFERENCES: Array<{ brand: string; name: string; category: Fragrance['category']; description: string; bottleSizes: number[] }> = [
  { brand: 'Tom Ford', name: 'Tobacco Vanille', category: 'unisex', description: 'Oriental especiada tipo gourmand: tabaco y especias sobre vainilla, cacao y haba tonka.', bottleSizes: [30, 50, 100] },
  { brand: 'Creed', name: 'Aventus', category: 'masculine', description: 'Chipre frutal amaderada: frutas sobre abedul, almizcle y musgo de roble.', bottleSizes: [50, 100] },
  { brand: 'Nishane', name: 'Ani X Extrait de Parfum', category: 'unisex', description: 'Fragancia unisex que ofrece una reinterpretación más fresca, cítrica y luminosa del Ani original.', bottleSizes: [50, 100] },
  { brand: 'Lorenzo Pazzaglia', name: 'Sun-Gria Extrait de Parfum', category: 'unisex', description: 'Frutal amaderada con toque gourmand: cítricos y frutas sobre vainilla y maderas.', bottleSizes: [28, 50] },
  { brand: 'Solonoi', name: 'Dolce Narcotico', category: 'unisex', description: 'Perfume de nicho argentino de familia gourmand, dulce y aterciopelado, con un carácter oscuro, misterioso y enigmático. Se describe como potente y de gran fijación.', bottleSizes: [100] },
  { brand: 'Xerjoff', name: 'Erba Pura', category: 'unisex', description: 'Cítrica y frutal con fondo ámbar-almizclado: naranja, limón y frutas mediterráneas.', bottleSizes: [50, 100] },
  { brand: 'Maison Margiela', name: 'Replica Lazy Sunday Morning', category: 'feminine', description: 'Floral almizclada: lirio de los valles, iris, rosa y almizcles blancos.', bottleSizes: [30, 100] },
  { brand: 'Parfums de Marly', name: 'Layton', category: 'masculine', description: 'Oriental floral aromática: manzana, lavanda y bergamota sobre vainilla, cardamomo y sándalo.', bottleSizes: [75, 125, 200] },
  { brand: 'Montale', name: 'Roses Musk', category: 'feminine', description: 'Floral amaderada almizclada: rosa búlgara con almizcle blanco y ámbar.', bottleSizes: [100] },
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
