// src/lib/physicsEngine.ts

export type ProductType = 'cabina_ducha' | 'divisor_oficina' | 'fachada_monumental' | 'puerta_pivotante';

export interface PhysicsInput {
  width: number;
  height: number;
  productType: ProductType;
}

export interface PhysicsResult {
  isValid: boolean;
  recommendedThickness: number; // in mm
  warnings: string[];
  explanation: string;
}

/**
 * Motor Físico B2B (Módulo de Ingeniería Aislada)
 * Simula tolerancias estructurales, cargas de viento simples y deflexión 
 * basado libremente en normas arquitectónicas (ej. NSR-10 simplificada).
 */
export function validateStructuralFeasibility(input: PhysicsInput): PhysicsResult {
  const area = (input.width * input.height) / 1000000; // m2
  const maxHeight = input.height;
  
  let result: PhysicsResult = {
    isValid: true,
    recommendedThickness: 8, // starting default
    warnings: [],
    explanation: ''
  };

  // Regla Básica: Límite absoluto de fabricación estándar para vidrio templado gigante
  if (input.width > 2400 || input.height > 3600) {
    result.isValid = false;
    result.warnings.push("Vano excede límites de manufactura (Jumbo size requerido).");
    result.explanation = "Por encima de 3.6m se requieren cristales monumentales procesados fuera de hornos estándar, viabilidad logística a estudiar.";
    result.recommendedThickness = 12;
    return result;
  }

  // Regla NSR-10 Carga de Viento / Relación de Esbeltez (Task 3.3.3)
  // Si la altura supera los 2.1m (2100mm), la palanca de flexión sube.
  if (maxHeight > 2100) {
    result.recommendedThickness = 10;
    result.warnings.push("Advertencia de Carga Estructural por altura (>2.1m).");
    result.explanation = `A ${input.height}mm de altura, el riesgo de flexión y pandeo exige subir el espesor del cristal a ${result.recommendedThickness}mm para garantizar rigidez absoluta.`;
    
    // Si además es fachada expuesta, extremar medidas
    if (input.productType === 'fachada_monumental') {
      result.recommendedThickness = 12;
      result.warnings.push("Presión de Viento Exterior Extrema.");
      result.explanation = "Zonas exteriores monumentales requieren perfilería reforzada con inercia superior y cristal de 12mm por empuje eólico.";
    }
  } else {
    // Escenarios sin altura extrema
    if (input.productType === 'fachada_monumental') {
      result.recommendedThickness = 10;
      result.explanation = "Estructura exterior. Recomendamos 10mm por seguridad de interperie.";
    } else if (input.productType === 'puerta_pivotante' && input.width > 1000) {
      result.recommendedThickness = 10;
      result.warnings.push("Puerta extra ancha - Riesgo de palanca en pivotes.");
      result.explanation = `A ${input.width}mm de ancho, el torque en los herrajes exigibles requiere cristal estructural de 10mm mínimo.`;
    } else {
      result.recommendedThickness = 8;
      result.explanation = "Medidas dentro del plano geométrico ideal. El espesor de 8mm provee el balance óptimo entre peso y resistencia estructural comercial.";
    }
  }

  // Validación de Área crítica para oficinas/duchas
  if (area > 3.5 && result.recommendedThickness < 10) {
    result.recommendedThickness = 10;
    result.warnings.push("Superficie vidriada extensa (>3.5 m²). Peso considerable.");
    result.explanation = "Para prevenir rotura espontánea térmica o por carga viva en una sola plancha gigante, se recomienda saltar a 10mm.";
  }

  return result;
}
