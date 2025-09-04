import { FastifyPluginAsync } from 'fastify';
import { auth } from '@repo/auth';

// Mount Better Auth under /auth/*
const authRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.route({
        method: ['GET', 'POST'],
        url: '/api/auth/*',
        handler: async (request, reply) => {
            try {
                console.log('[AUTH] Incoming request:', request.method, request.url);
                const url = new URL(request.url, `http://${request.headers.host}`);

                // Build Headers object
                const headers = new Headers();
                for (const [key, value] of Object.entries(request.headers)) {
                    if (value) headers.append(key, Array.isArray(value) ? value.join(',') : String(value));
                }

                // Prepare body (Better Auth expects standard fetch Request body)
                const body =
                    request.body && request.method !== 'GET' && request.method !== 'HEAD'
                        ? typeof request.body === 'string'
                            ? request.body
                            : JSON.stringify(request.body)
                        : undefined;

                const fetchRequest = new Request(url.toString(), {
                    method: request.method,
                    headers,
                    body,
                });

                const response = await auth.handler(fetchRequest);

                reply.status(response.status);
                response.headers.forEach((value: string, key: string) => reply.header(key, value));

                // Stream / text body
                const text = await response.text();
                reply.send(text.length ? text : null);
            } catch (err) {
                request.log.error({ err }, 'Better Auth handler error');
                reply.status(500).send({ error: 'Internal authentication error', code: 'AUTH_FAILURE' });
            }
        },
    });
};

export default authRoutes;
