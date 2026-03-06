import { describe, it, expect, vi } from 'vitest';
import { SupabaseSeoRepository } from './SupabaseSeoRepository';
import type { SupabaseClient } from '@supabase/supabase-js';

describe('SupabaseSeoRepository', () => {
  it('should return systems when query is successful', async () => {
    const mockSystems = [
      { id: '1', slug: 'sys-1', name: 'System 1' }
    ];

    const mockSelect = vi.fn().mockResolvedValue({ data: mockSystems, error: null });
    const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
    const mockClient = { from: mockFrom } as unknown as SupabaseClient<any>;

    const repo = new SupabaseSeoRepository(mockClient);
    const result = await repo.getAllSystems();

    expect(mockFrom).toHaveBeenCalledWith('seo_systems');
    expect(mockSelect).toHaveBeenCalledWith('id, slug, name');
    expect(result).toEqual(mockSystems);
  });

  it('should throw an error when fetching systems fails', async () => {
    const mockError = new Error('DB Error');
    const mockSelect = vi.fn().mockResolvedValue({ data: null, error: mockError });
    const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
    const mockClient = { from: mockFrom } as unknown as SupabaseClient<any>;

    const repo = new SupabaseSeoRepository(mockClient);

    await expect(repo.getAllSystems()).rejects.toThrow('No se pudieron obtener los sistemas SEO.');
  });

  it('should return locations when query is successful', async () => {
    const mockLocations = [
      { id: '1', slug: 'loc-1', name: 'Loc 1', department: 'Dep 1' }
    ];

    const mockSelect = vi.fn().mockResolvedValue({ data: mockLocations, error: null });
    const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
    const mockClient = { from: mockFrom } as unknown as SupabaseClient<any>;

    const repo = new SupabaseSeoRepository(mockClient);
    const result = await repo.getAllLocations();

    expect(mockFrom).toHaveBeenCalledWith('seo_locations');
    expect(mockSelect).toHaveBeenCalledWith('id, slug, name, department');
    expect(result).toEqual(mockLocations);
  });

  it('should throw an error when fetching locations fails', async () => {
    const mockError = new Error('DB Error');
    const mockSelect = vi.fn().mockResolvedValue({ data: null, error: mockError });
    const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });
    const mockClient = { from: mockFrom } as unknown as SupabaseClient<any>;

    const repo = new SupabaseSeoRepository(mockClient);

    await expect(repo.getAllLocations()).rejects.toThrow('No se pudieron obtener las ubicaciones SEO.');
  });
});
