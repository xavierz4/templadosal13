import type { PhysicsInput, PhysicsResult } from '../physicsEngine';

/**
 * OCP Strategy Contract (Open/Closed Principle)
 * Cada tipo de producto implementa su propia lógica de validación
 * estructural de forma aislada. Para añadir un nuevo producto,
 * se crea una nueva clase aquí SIN tocar el motor principal.
 */
export interface IPhysicsStrategy {
  /**
   * Calcula la viabilidad estructural para el tipo de producto que gestiona.
   */
  validate(input: PhysicsInput): PhysicsResult;
}
