import { FastifyReply, FastifyRequest } from 'fastify';

export const CreateMovie = (request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ hello: 'world' });
};
