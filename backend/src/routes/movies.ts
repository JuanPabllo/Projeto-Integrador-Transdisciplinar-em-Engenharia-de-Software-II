import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

const prisma = new PrismaClient();

interface CreateMovieRequestBody {
  name: string;
  director: string;
  release: string;
}

export const createMovieRoute = async (
  request: FastifyRequest<{ Body: CreateMovieRequestBody }>,
  reply: FastifyReply
) => {
  try {
    const { name, director, release } = request.body;

    const newMovie = await prisma.movie.create({
      data: {
        name,
        director,
        release: new Date(release),
      },
    });

    reply.send(newMovie);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao criar o filme' });
  }
};

export const getMovieRoute = async (
  request: FastifyRequest<{ Body: CreateMovieRequestBody }>,
  reply: FastifyReply
) => {
  try {
    const movies = await prisma.movie.findMany();

    reply.send(movies);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao buscar o filmes' });
  }
};
