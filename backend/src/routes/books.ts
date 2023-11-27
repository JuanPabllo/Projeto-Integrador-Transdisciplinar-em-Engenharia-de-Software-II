import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

const prisma = new PrismaClient();

interface CreateBookRequestBody {
  name: string;
  writer: string;
  release: string;
}

export const createBookRoute = async (
  request: FastifyRequest<{ Body: CreateBookRequestBody }>,
  reply: FastifyReply
) => {
  try {
    const { name, writer, release } = request.body;

    const newBook = await prisma.book.create({
      data: {
        name,
        writer,
        release: new Date(release),
      },
    });

    reply.send(newBook);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao criar o livro' });
  }
};

export const getBooksRoute = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const books = await prisma.book.findMany();

    reply.send(books);
  } catch (error) {
    console.error(error);
    reply.status(500).send({ error: 'Erro ao buscar os livros' });
  }
};
