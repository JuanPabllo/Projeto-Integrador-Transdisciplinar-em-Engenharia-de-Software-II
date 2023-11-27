import Fastify from 'fastify';
import { createMovieRoute, getMovieRoute } from './routes/movies';

const fastify = Fastify({
  logger: true,
});

fastify.route({
  method: 'POST',
  url: '/movies',
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        director: { type: 'string' },
        release: { type: 'string' },
      },
      required: ['name', 'director', 'release'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          director: { type: 'string' },
          release: { type: 'string' },
          createdAt: { type: 'string' },
        },
      },
    },
  },
  handler: createMovieRoute,
});

fastify.route({
  method: 'GET',
  url: '/movies',
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            director: { type: 'string' },
            release: { type: 'string' },
            createdAt: { type: 'string' },
          },
        },
      },
    },
  },
  handler: getMovieRoute,
});

fastify.listen({ port: 8080 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
