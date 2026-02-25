import type { IPhysicsStrategy } from './IPhysicsStrategy';
import type { PhysicsInput, PhysicsResult } from '../physicsEngine';

/**
 * Estrategia de Validación Física para: Cabina de Ducha
 * Lógica aislada. Abierto para extensión, cerrado para modificación.
 */
export class CabinaDuchaStrategy implements IPhysicsStrategy {
  validate(input: PhysicsInput): PhysicsResult {
    const result: PhysicsResult = {
      isValid: true,
      recommendedThickness: 8,
      warnings: [],
      explanation: ''
    };

    // Límite de fábrica para cabinas de ducha estándar
    if (input.width > 1800 || input.height > 2200) {
      result.isValid = false;
      result.warnings.push('Cabina fuera de rango fabricación estándar (>1800mm ancho o >2200mm alto).');
      result.explanation = 'Las cabinas de ducha de mayor tamaño requieren módulos especiales y montaje dedicado.';
      result.recommendedThickness = 10;
      return result;
    }

    // Cabinas con área extensa requieren mayor espesor
    const area = (input.width * input.height) / 1_000_000;
    if (area > 2.0) {
      result.recommendedThickness = 10;
      result.warnings.push('Superficie de ducha extensa (>2.0 m²). Peso considerable.');
    }

    result.explanation = `Cabina de ${input.width}mm × ${input.height}mm. Espesor recomendado: ${result.recommendedThickness}mm con perfil de aluminio anodizado.`;
    return result;
  }
}
