import fastify, { FastifyError, FastifyRequest } from 'fastify'
import BackendService, { Metric } from './src/metrics'
import { NotFound, InternalServerError } from 'http-errors'

const server = fastify({
  logger: {
    level: 'info',
    messageKey: 'message',
  },
})

const service = new BackendService()

server.get('/metrics', async (request, reply) => {
  const resultGetMetrics = await service.getMetrics()
  return reply.code(200).send(resultGetMetrics)
})

server.get(
  '/metric/:id',
  async (
    request: FastifyRequest<{
      Params: {
        id: string
      }
    }>,
    reply
  ) => {
    const resultGetMetric = await service.getMetric(request.params.id)
    if (resultGetMetric) {
      return reply.code(200).send(resultGetMetric)
    } else {
      throw new NotFound()
    }
  }
)

server.post(
  '/metric',
  async (
    request: FastifyRequest<{
      Body: Metric
    }>,
    reply
  ) => {
    const result = service.addMetric(request.body)
    if (result) {
      return reply.code(200).send(result)
    }
  }
)

server.put(
  '/metric/:id',
  async (
    request: FastifyRequest<{
      Body: Metric
    }>,
    reply
  ) => {
    const result = service.updateMetric(request.body)
    if (result) {
      return reply.code(200).send(result)
    }
  }
)

server.delete(
  '/metric/:id',
  async (
    request: FastifyRequest<{
      Params: { id: string }
    }>,
    reply
  ) => {
    const result = service.deleteMetric(request.params.id)
    if (result) {
      return reply.code(200).send(result)
    }
  }
)

server.setErrorHandler(function (error, request, reply) {
  if (error instanceof fastify.errorCodes.FST_ERR_NOT_FOUND) {
    this.log.error(error)
    reply.status(404).send('Resource not found')
  } else {
    // fastify will use parent error handler to handle this
    reply.send(error)
  }
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  console.log(`Server listen at ${address}`)
})
