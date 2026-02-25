import type { IPhysicsStrategy } from './IPhysicsStrategy';
import type { PhysicsInput, PhysicsResult } from '../physicsEngine';

/**
 * Estrategia de Validación Física para: Puerta Pivotante
 * Considera el torque sobre herrajes y la palanca de peso.
 */
export class PuertaPivotanteStrategy implements IPhysicsStrategy {
  validate(input: PhysicsInput): PhysicsResult {
    const result: PhysicsResult = {
      isValid: true,
      recommendedThickness: 8,
      warnings: [],
      explanation: ''
    };

    if (input.width > 1200 || input.height > 2800) {
      result.isValid = false;
      result.warnings.push('Puerta pivotante fuera de tolerancia de herraje estándar (>1200mm ancho o >2800mm alto).');
      result.explanation = 'Puertas de mayor envergadura requieren pivotes industriales reforzados y análisis de torque dedicado.';
      result.recommendedThickness = 12;
      return result;
    }

    // Puertas anchas aumentan palanca torsional en el pivote
    if (input.width > 1000) {
      result.recommendedThickness = 10;
      result.warnings.push('Puerta extra ancha — Riesgo de palanca en pivotes.');
      result.explanation = `A ${input.width}mm de ancho, el torque en los herrajes exige cristal estructural de 10mm mínimo para prevenir deflexión y rotura del pivote.`;
    } else {
      result.explanation = `Puerta pivotante de ${input.width}mm × ${input.height}mm. Balance óptimo de 8mm con herraje pivote de serie.`;
    }

    return result;
  }
}
