import { describe, it, expect, vi } from 'vitest';
import { SupabaseAnalyticsRepository } from '@core/infrastructure/repositories/SupabaseAnalyticsRepository';
import type { SupabaseClient } from '@supabase/supabase-js';

describe('SupabaseAnalyticsRepository', () => {
  it('should call the get_dashboard_analytics RPC and return data', async () => {
    const mockData = [
      {
        record_month: '2026-03-01T00:00:00.000Z',
        product_type: 'Puerta Baño',
        status: 'NUEVO',
        leads_count: 5,
        total_estimated_value: 5000000,
      },
    ];

    const mockRpc = vi.fn().mockReturnValue({
      returns: vi.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    const mockSupabase = {
      rpc: mockRpc,
    } as unknown as SupabaseClient;

    const repository = new SupabaseAnalyticsRepository(mockSupabase);
    const result = await repository.getDashboardAnalytics();

    expect(mockRpc).toHaveBeenCalledWith('get_dashboard_analytics');
    expect(result).toEqual(mockData);
  });

  it('should throw an error if the RPC fails', async () => {
    const mockRpc = vi.fn().mockReturnValue({
      returns: vi.fn().mockResolvedValue({ data: null, error: { message: 'DB Error' } }),
    });

    const mockSupabase = {
      rpc: mockRpc,
    } as unknown as SupabaseClient;

    const repository = new SupabaseAnalyticsRepository(mockSupabase);

    await expect(repository.getDashboardAnalytics()).rejects.toThrow('Analytics Fetch Error: DB Error');
  });
});
