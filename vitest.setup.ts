import '@testing-library/jest-dom';
import { beforeAll, vi } from 'vitest';

beforeAll(() => {
    global.matchMedia = vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
    }));
});
