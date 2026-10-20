import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

//TODO add another setup code if needed
afterEach(() => {
    cleanup();
})