import { DEMO_CATALOG } from '../../data/demo/catalog';
import type { CatalogFilters, FragranceWithPresentations } from '../../types/catalog';
import { DEFAULT_FILTERS } from '../../types/catalog';
import type { CatalogRepository } from './catalogRepository';

function normalize(str: string): string {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export class DemoCatalogRepository implements CatalogRepository {
  private catalog: FragranceWithPresentations[] = DEMO_CATALOG;

  async list(filters?: Partial<CatalogFilters>): Promise<FragranceWithPresentations[]> {
    const f: CatalogFilters = { ...DEFAULT_FILTERS, ...(filters || {}) };
    let results = [...this.catalog];

    if (f.section && f.section !== 'all') {
      results = results.filter((item) => (item.section || 'general') === f.section);
    }

    if (f.classification) results = results.filter((item) => item.classifications?.includes(f.classification!));
    if (f.segment) results = results.filter((item) => item.segments?.includes(f.segment!));
    if (f.offer) results = results.filter((item) => item.isDemoOffer);
    if (f.sizeMl !== null) results = results.filter((item) => item.presentations.some((p) => p.sizeMl === f.sizeMl && (f.format === 'all' || p.format === f.format)));

    if (f.brandId) {
      results = results.filter((item) => item.brand.id === f.brandId);
    }


    if (f.category !== 'all') {
      results = results.filter((item) => item.category === f.category);
    }

    if (f.format !== 'all') {
      results = results.filter((item) =>
        item.presentations.some((p) => p.format === f.format)
      );
    }

    if (f.query && f.query.trim()) {
      const q = normalize(f.query.trim());
      results = results.filter((item) => {
        const name = normalize(item.name);
        const brand = normalize(item.brand.name);
        const notes = (item.notes || []).map((n) => normalize(n)).join(' ');
        return name.includes(q) || brand.includes(q) || notes.includes(q) || normalize(item.category).includes(q) || (item.classifications ?? []).some((value) => normalize(value).includes(q)) || (item.segments ?? []).some((value) => normalize(value).includes(q));
      });
    }

    return results;
  }

  async getById(id: string): Promise<FragranceWithPresentations | null> {
    const found = this.catalog.find((item) => item.id === id);
    return found ? { ...found } : null;
  }

  async getByPresentationId(id: string): Promise<FragranceWithPresentations | null> {
    const found = this.catalog.find((item) => item.presentations.some((presentation) => presentation.id === id));
    return found ? { ...found } : null;
  }
}

export const demoCatalogRepository = new DemoCatalogRepository();
