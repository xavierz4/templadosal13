import type { IPhysicsStrategy } from './IPhysicsStrategy';
import type { PhysicsInput, PhysicsResult } from '../physicsEngine';

/**
 * Estrategia de Validación Física para: Fachada Monumental
 * Expuesta a cargas de viento, presión UV y agentes ambientales.
 * Basada libremente en NSR-10 Cap. E.
 */
export class FachadaMonumentalStrategy implements IPhysicsStrategy {
  validate(input: PhysicsInput): PhysicsResult {
    const result: PhysicsResult = {
      isValid: true,
      recommendedThickness: 10, // Las fachadas parten de 10mm por seguridad exterior
      warnings: [],
      explanation: ''
    };

    // Límite superior de fabrica para fachadas monolíticas sin refuerzo
    if (input.width > 2400 || input.height > 3600) {
      result.isValid = false;
      result.warnings.push('Vano monumental (Jumbo size). Requiere logística especializada de grúa.');
      result.explanation = 'Por encima de 3.6m de altura en fachada, se requieren cristales monumentales procesados fuera de hornos estándar. Viabilidad logística a estudiar.';
      result.recommendedThickness = 12;
      return result;
    }

    // Zonas exteriores de altura siempre requieren máximo espesor
    if (input.height > 2100) {
      result.recommendedThickness = 12;
      result.warnings.push('Presión de Viento Exterior Extrema. Altura > 2.1m en fachada.');
      result.explanation = 'Zonas exteriores monumentales con altura superior exigen perfilería reforzada con inercia superior y cristal de 12mm por empuje eólico.';
    } else {
      result.explanation = `Fachada monumental de ${input.width}mm × ${input.height}mm. Estructura exterior: 10mm mínimo por seguridad de intemperie, tratamiento UV doble.`;
    }

    return result;
  }
}
