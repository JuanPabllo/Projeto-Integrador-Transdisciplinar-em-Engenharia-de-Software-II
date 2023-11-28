import cors from '@fastify/cors';
import Fastify from 'fastify';
import {
  createBookRoute,
  deleteBookByNameRoute,
  getBooksRoute,
} from './routes/books';
import {
  createMovieRoute,
  deleteMovieByNameRoute,
  getMovieRoute,
} from './routes/movies';

const fastify = Fastify({
  logger: true,
});

fastify.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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

fastify.route({
  method: 'DELETE',
  url: '/movies/:name',
  schema: {
    params: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteMovieByNameRoute,
});

fastify.route({
  method: 'POST',
  url: '/books',
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        writer: { type: 'string' },
        release: { type: 'string' },
      },
      required: ['name', 'writer', 'release'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          writer: { type: 'string' },
          release: { type: 'string' },
          createdAt: { type: 'string' },
        },
      },
    },
  },
  handler: createBookRoute,
});

fastify.route({
  method: 'GET',
  url: '/books',
  schema: {
    response: {
      200: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            writer: { type: 'string' },
            release: { type: 'string' },
            createdAt: { type: 'string' },
          },
        },
      },
    },
  },
  handler: getBooksRoute,
});

fastify.route({
  method: 'DELETE',
  url: '/books/:name',
  schema: {
    params: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteBookByNameRoute,
});

fastify.listen({ port: 8080 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
