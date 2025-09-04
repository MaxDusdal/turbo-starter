import { FastifyPluginAsync } from 'fastify';
import { api } from '@repo/contracts';
import { initServer } from '@ts-rest/fastify';

// Initialize ts-rest server
const s = initServer();

// Implement only the health contract for now
const router = s.router(api, {
    health: async () => {
        return {
            status: 200 as const,
            body: { ok: true },
        };
    },
});

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
    // Preserve existing root route behavior expected by tests
    fastify.get('/', async () => ({ root: true }));

    // Register the ts-rest router (adds /v1/health)
    fastify.register(s.plugin(router));

    // Note: authRoutes is automatically loaded by AutoLoad from auth.ts
};

export default root;
