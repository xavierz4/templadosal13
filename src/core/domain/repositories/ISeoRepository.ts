import type { SeoSystem, SeoLocation } from '../seoSchema';

export interface ISeoRepository {
  getAllSystems(): Promise<SeoSystem[]>;
  getAllLocations(): Promise<SeoLocation[]>;
}
