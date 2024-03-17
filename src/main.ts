import Fastify from 'fastify'
import router from './routes/router'

const fastify = Fastify({
  logger: true
})

fastify.register(router)

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})