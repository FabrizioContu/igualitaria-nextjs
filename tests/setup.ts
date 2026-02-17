import { vi } from 'vitest';

// Set env vars before any module imports
process.env.NEXT_PUBLIC_WP_DOMAIN = 'https://laigualitaria.coop';

// Mock global fetch
global.fetch = vi.fn();
