import fp from 'fastify-plugin';
import fastifyCors from '@fastify/cors';

// CORS plugin to allow frontend (e.g. Next.js at localhost:3000) to send credentials
export default fp(async (fastify) => {
  const origin = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
  await fastify.register(fastifyCors, {
    origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With'
    ],
    credentials: true,
    maxAge: 86400,
  });
});
