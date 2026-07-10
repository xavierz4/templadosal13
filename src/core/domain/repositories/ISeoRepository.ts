import type { SeoSystem, SeoLocation, SeoSystemInput, SeoLocationInput } from '../seoSchema';

export interface ISeoRepository {
  getAllSystems(): Promise<SeoSystem[]>;
  getAllLocations(): Promise<SeoLocation[]>;

  createSystem(input: SeoSystemInput): Promise<SeoSystem>;
  updateSystem(id: string, input: SeoSystemInput): Promise<SeoSystem>;
  deleteSystem(id: string): Promise<void>;

  createLocation(input: SeoLocationInput): Promise<SeoLocation>;
  updateLocation(id: string, input: SeoLocationInput): Promise<SeoLocation>;
  deleteLocation(id: string): Promise<void>;
}
