const fastify = require('fastify')({
  logger: true
})



fastify.post('/clientes/:id/transacoes', function (request, reply) {
    return { hello: 'world'}
})

fastify.get('/clientes/:id/extrato', function (request, reply) {
    return { hello: 'world'}
})

fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})