import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Hero from './Hero.svelte';

describe('Landing Module: Hero.svelte (B2B Presentation)', () => {
    afterEach(() => cleanup());

    it('renders the main SEO H1 headline accurately', () => {
        render(Hero);
        const headlinePart1 = screen.getByText(/CRISTAL/i);
        const headlinePart2 = screen.getByText(/ALUMINIO/i);
        const headlinePart3 = screen.getByText(/ARQUITECTÓNICO/i);
        
        expect(headlinePart1).toBeDefined();
        expect(headlinePart2).toBeDefined();
        expect(headlinePart3).toBeDefined();
    });

    it('contains the call-to-action button for quoting', () => {
        render(Hero);
        const ctaBtn = screen.getByText(/Cotizar Proyecto/i);
        expect(ctaBtn).toBeDefined();
    });
});
