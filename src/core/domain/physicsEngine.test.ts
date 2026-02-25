import { describe, it, expect } from 'vitest';
import { validateStructuralFeasibility } from './physicsEngine';

describe('B2B Physics Engine Validator', () => {
  it('should recommend 8mm for standard sized shower cabin', () => {
    const res = validateStructuralFeasibility({
      width: 1200,
      height: 1900,
      productType: 'cabina_ducha'
    });
    expect(res.isValid).toBe(true);
    expect(res.recommendedThickness).toBe(8);
    expect(res.warnings.length).toBe(0);
  });

  it('should force 10mm and trigger wind load warning when height > 2100mm', () => {
    const res = validateStructuralFeasibility({
      width: 1000,
      height: 2200, // Trigger point
      productType: 'cabina_ducha'
    });
    expect(res.isValid).toBe(true);
    expect(res.recommendedThickness).toBe(10);
    expect(res.warnings).toContain("Advertencia de Carga Estructural por altura (>2.1m).");
  });

  it('should force 12mm for monumental facades over 2100mm', () => {
    const res = validateStructuralFeasibility({
      width: 1500,
      height: 2400,
      productType: 'fachada_monumental'
    });
    expect(res.isValid).toBe(true);
    expect(res.recommendedThickness).toBe(12);
  });

  it('should fail with jumbo size limitations if completely oversized', () => {
    const res = validateStructuralFeasibility({
      width: 3000,
      height: 4000,
      productType: 'divisor_oficina'
    });
    expect(res.isValid).toBe(false);
    expect(res.warnings).toContain("Vano excede límites de manufactura (Jumbo size requerido).");
  });
});
