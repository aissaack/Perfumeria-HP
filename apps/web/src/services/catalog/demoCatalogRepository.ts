import { DEMO_CATALOG } from '../../data/demo/catalog';
import type { CatalogFilters, FragranceWithPresentations } from '../../types/catalog';
import type { CatalogRepository } from './catalogRepository';

const DEFAULT_FILTERS: CatalogFilters = {
  query: '',
  brandId: null,
  format: 'all',
  family: null,
  section: 'all',
};

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

    if (f.brandId) {
      results = results.filter((item) => item.brand.id === f.brandId);
    }

    if (f.family) {
      results = results.filter((item) => item.family === f.family);
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
        const family = item.family ? normalize(item.family) : '';
        const notes = (item.notes || []).map((n) => normalize(n)).join(' ');
        return name.includes(q) || brand.includes(q) || family.includes(q) || notes.includes(q);
      });
    }

    return results;
  }

  async getById(id: string): Promise<FragranceWithPresentations | null> {
    const found = this.catalog.find((item) => item.id === id);
    return found ? { ...found } : null;
  }
}

export const demoCatalogRepository = new DemoCatalogRepository();
