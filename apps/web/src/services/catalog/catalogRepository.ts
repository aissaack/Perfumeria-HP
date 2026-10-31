import type { CatalogFilters, FragranceWithPresentations } from '../../types/catalog';

export interface CatalogRepository {
  list(filters?: Partial<CatalogFilters>): Promise<FragranceWithPresentations[]>;
  getById(id: string): Promise<FragranceWithPresentations | null>;
  getByPresentationId(id: string): Promise<FragranceWithPresentations | null>;
}

export const catalogRepository: CatalogRepository = {
  list: async () => {
    throw new Error('catalogRepository not initialized. Use demoCatalogRepository.');
  },
  getById: async () => {
    throw new Error('catalogRepository not initialized. Use demoCatalogRepository.');
  },
  getByPresentationId: async () => {
    throw new Error('catalogRepository not initialized. Use demoCatalogRepository.');
  },
};
