import type { IPhysicsStrategy } from './IPhysicsStrategy';
import type { PhysicsInput, PhysicsResult } from '../physicsEngine';

/**
 * Estrategia de Validación Física para: Divisor de Oficina
 * Optimizada para interiores comerciales y corporativos.
 */
export class DivisorOficinaStrategy implements IPhysicsStrategy {
  validate(input: PhysicsInput): PhysicsResult {
    const result: PhysicsResult = {
      isValid: true,
      recommendedThickness: 8,
      warnings: [],
      explanation: ''
    };

    if (input.width > 4000 || input.height > 3000) {
      result.isValid = false;
      result.warnings.push('Panel de oficina demasiado grande. Módulo máximo: 4000mm × 3000mm.');
      result.explanation = 'Los paneles de división corporativa de mayor tamaño se solicitan como sistemas modulares multi-panel.';
      result.recommendedThickness = 10;
      return result;
    }

    // Oficinas abiertas de gran formato necesitan refuerzo
    if (input.height > 2500) {
      result.recommendedThickness = 10;
      result.warnings.push('Mampara alta (>2.5m). Se recomienda guía superior de refuerzo.');
      result.explanation = `Panel corporativo de ${input.height}mm de altura. El espesor de 10mm garantiza la rigidez lateral requerida por la norma OSHAS de ambientes laborales.`;
    } else {
      result.explanation = `Divisor corporativo de ${input.width}mm × ${input.height}mm. Configuración óptima en vidrio de 8mm con perfil de aluminio lacado.`;
    }

    return result;
  }
}
