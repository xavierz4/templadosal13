// Public API para el módulo Landing
// Siguiendo el Estándar FSD (Feature-Sliced Design), los consumidores externos
// solo deben importar desde este archivo, nunca directamente desde ./ui/*

export { default as Hero } from './ui/Hero.svelte';
export { default as ValueProposition } from './ui/ValueProposition.svelte';
export { default as TrustTicker } from './ui/TrustTicker.astro';
export { default as QuantitativeImpact } from './ui/QuantitativeImpact.astro';
