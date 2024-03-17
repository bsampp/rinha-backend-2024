async function router(fastify){
    fastify.route({
        method: 'GET',
        url: '/clientes/:id/extrato',
        handler: async (request, reply) => {
            return { hello: 'world' }
        }
    })

    fastify.route({
        method: 'POST',
        url: '/clientes/:id/transacoes',
        handler: async (request, reply) => {
            return { hello: 'world' }
        }
    })
}

export default router