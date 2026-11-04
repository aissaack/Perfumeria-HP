import type { FragranceWithPresentations } from '../../types/catalog';
import { demoCatalogRepository } from './demoCatalogRepository';

export type SearchSection = 'own' | 'general' | 'niche';
export const sectionLabels: Record<SearchSection, string> = { own: 'Perfumes Huelepectacular', general: 'Catálogo', niche: 'Perfumes de Nicho' };
export const sectionPaths: Record<SearchSection, string> = { own: '/perfumes-huelepectacular', general: '/catalogo', niche: '/catalogo/nicho' };
export function getSearchSection(item: FragranceWithPresentations): SearchSection {
  return item.section === 'own' ? 'own' : item.segments?.includes('Nicho') ? 'niche' : 'general';
}
export function normalizeSearch(value: string) { return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
export async function searchCatalog(query: string) {
  if (!query.trim()) return [];
  return demoCatalogRepository.list({ query });
}
