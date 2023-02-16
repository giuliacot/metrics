import fastify, { FastifyRequest } from 'fastify'
import BackendService, { Metric } from './src/metrics'
import { NotFound, BadRequest } from 'http-errors'
import cors from '@fastify/cors'

const server = fastify({
  logger: {
    level: 'info',
    messageKey: 'message',
  },
})

server.register(cors, {
  origin: true,
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
    const result = await service.addMetric(request.body)
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
    const result = await service.updateMetric(request.body)
    if (result) {
      return reply.code(200).send(result)
    } else {
      throw new NotFound()
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
    const result = await service.deleteMetric(request.params.id)
    if (result) {
      return reply.code(200).send(result)
    } else {
      throw new BadRequest()
    }
  }
)

// minimal setting fastify ErrorHandler
server.setErrorHandler(function (error, request, reply) {
  if (error instanceof fastify.errorCodes.FST_ERR_NOT_FOUND) {
    this.log.error(error)
    reply.status(404).send('Resource not found')
  } else {
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
