import type { Brand, Fragrance, ProductPresentation } from '../../types/catalog';

const brand: Brand = { id: 'demo-brand-own', name: 'Huelepectacular' };

export const FICTIONAL_UNISEX_ID = 'demo-own-unisex-example';

export const HUELEPECTACULAR_FRAGRANCES: Fragrance[] = [
  { id: 'demo-own-black-poison-twist', name: 'Black Poison Twist', brand, category: 'masculine', family: 'Frutal, floral', isDemoData: true, section: 'own' },
  { id: 'demo-own-black-poison', name: 'Black Poison', brand, category: 'masculine', family: 'Floral, especiado, gourmand', isDemoData: true, section: 'own' },
  { id: 'demo-own-in-your-prime', name: 'In Your Prime', brand, category: 'masculine', family: 'Ámbar gourmand', isDemoData: true, section: 'own' },
  { id: 'demo-own-you-are-mine', name: 'You Are Mine', brand, category: 'masculine', family: 'Ámbar fougère', description: 'Referencia de inspiración informada por la tienda: Le Male Elixir de Jean Paul Gaultier.', isDemoData: true, section: 'own' },
  { id: 'demo-own-sexy-fever', name: 'Sexy Fever', brand, category: 'feminine', family: 'Ámbar floral', description: 'Referencia de inspiración informada por la tienda: Creed Carmina.', isDemoData: true, section: 'own' },
  { id: FICTIONAL_UNISEX_ID, name: 'unisex ejemplo', brand, category: 'unisex', family: 'Cítrico aromático', description: 'Producto ficticio de demostración; no representa un producto ni un lanzamiento real.', isDemoData: true, section: 'own' },
];

const IMAGE_DIRECTORY = `${import.meta.env.BASE_URL}images/demo/perfumesHP_Ejemplos/`;

const PRESENTATION_IMAGES: Record<string, { bottle: string; decant?: string }> = {
  'demo-own-black-poison-twist': { bottle: '05-black-poison-twist-100ml.jpg' },
  'demo-own-black-poison': { bottle: '02-black-poison-100ml.jpg', decant: 'BlackPoison_decant5ml-blanco.png' },
  'demo-own-in-your-prime': { bottle: '06-InYourPrime-100ml.jpg', decant: 'InYourPrime_decant5ml-blanco.png' },
  'demo-own-you-are-mine': { bottle: '03-you-are-mine-100ml.jpg', decant: 'YouAreMine_decant5ml-blanco.png' },
  'demo-own-sexy-fever': { bottle: '01-sexy-fever-100ml.jpg', decant: 'SexyFever_decant5ml-blanco.png' },
  [FICTIONAL_UNISEX_ID]: { bottle: '04-unisex-ejemplo-100ml.jpg', decant: 'Unisex_decant5ml-blanco.png' },
};

// Importes ficticios, definidos únicamente para la demostración.
export const HUELEPECTACULAR_PRESENTATIONS: ProductPresentation[] = HUELEPECTACULAR_FRAGRANCES.flatMap((fragrance) => {
  const images = PRESENTATION_IMAGES[fragrance.id];
  const bottle: ProductPresentation = { id: `${fragrance.id}-bottle`, fragranceId: fragrance.id, format: 'bottle', sizeMl: 100, priceArs: 39990, currency: 'ARS', isDemoData: true, imageUrl: images?.bottle ? `${IMAGE_DIRECTORY}${images.bottle}` : undefined };
  if (fragrance.id === 'demo-own-black-poison-twist') return [bottle];
  const decant: ProductPresentation = { id: `${fragrance.id}-decant`, fragranceId: fragrance.id, format: 'decant', sizeMl: 5, priceArs: 6990, currency: 'ARS', isDemoData: true, imageUrl: images?.decant ? `${IMAGE_DIRECTORY}${images.decant}` : undefined };
  return [bottle, decant];
});
