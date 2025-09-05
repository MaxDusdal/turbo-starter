import Fastify from 'fastify'
import app from './app'

const PORT = Number(process.env.API_PORT || process.env.PORT || 3001)

async function start() {
	const fastify = Fastify({ logger: true })
	await fastify.register(app)
	try {
		await fastify.listen({ port: PORT, host: '0.0.0.0' })
		// eslint-disable-next-line no-console
		console.log(`API listening on http://localhost:${PORT}`)
	} catch (err) {
		fastify.log.error(err)
		process.exit(1)
	}
}

start()
