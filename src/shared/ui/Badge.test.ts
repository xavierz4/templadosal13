import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Badge from './Badge.svelte';

describe('Atomic Component: Badge.svelte (Glassmorphism UI)', () => {
    // Evitar polución del DOM entre cada test
    afterEach(() => cleanup());

    it('renders with default props and text', () => {
        render(Badge);
        const element = screen.getByText('AL13 Certified');
        expect(element).toBeDefined();
        // Verificar que hereda clases default
        expect(element.className).toContain('bg-al13-glass-light');
    });

    it('renders custom text flawlessly', () => {
        render(Badge, { text: 'Boutique Industrial' });
        expect(screen.getByText('Boutique Industrial')).toBeDefined();
    });

    it('applies premium styling classes when type is "premium"', () => {
        render(Badge, { text: 'Premium', type: 'premium' });
        const element = screen.getByText('Premium');
        // El badge Premium inyecta Oro de la paleta
        expect(element.className).toContain('text-al13-cyan');
        expect(element.className).toContain('from-al13-cyan/10');
    });
});
