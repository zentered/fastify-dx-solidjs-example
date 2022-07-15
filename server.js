import Fastify from 'fastify'
import FastifyVite from 'fastify-vite'
import FastifyDXSolid from 'fastify-dx-solid'
import { ManagementClient } from 'auth0'

const port = process.env.PORT ?? 5000
const logger = process.env.LOGGER ?? false

const server = Fastify({
  logger: logger
})

server.decorate('userData', {})
await server.register(FastifyVite, {
  root: import.meta.url,
  renderer: FastifyDXSolid
})

server.post('/api/token', async (request, reply) => {
  const userId = request.body.userId

  const management = new ManagementClient({
    telemetry: false,
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scope: 'read:user_idp_tokens'
  })

  const user = await management.getUser({ id: userId })
  if (user && user.identities) {
    return reply.send({ token: user.identities[0].access_token })
  }
  return reply.send({ ok: true })
})

await server.vite.ready()

await server.listen({ host: '0.0.0.0', port: port })
