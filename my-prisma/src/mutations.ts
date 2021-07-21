import { inputObjectType, mutationField, nonNull, intArg, arg } from 'nexus';
import { Context } from './context';
import { eventType } from './subscriptions';

const AuthorCreateInput = inputObjectType({
  name: 'AuthorCreateInput',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.list.nonNull.field('books', { type: 'BookCreateInput' });
  },
});

const createAuthor = mutationField('createAuthor', {
  type: 'Author',
  args: {
    data: nonNull(arg({ type: 'AuthorCreateInput' })),
  },
  async resolve(_parent, args, context: Context) {
    const booksData = args.data.books?.map((book) => ({ title: book.title }));
    const newAuthor = await context.prisma.author.create({
      data: { name: args.data.name, books: { create: booksData } },
    });

    context.pubsub.publish(eventType, newAuthor);
    return newAuthor;
  },
});

const deleteAuthor = mutationField('deleteAuthor', {
  type: 'Author',
  args: {
    id: nonNull(intArg()),
  },
  resolve(_parent, args, context: Context) {
    return context.prisma.author.delete({ where: { id: args.id } });
  },
});

const BookCreateInput = inputObjectType({
  name: 'BookCreateInput',
  definition(t) {
    t.nonNull.string('title');
    t.string('comment');
  },
});

const createBook = mutationField('createBook', {
  type: 'Book',
  args: {
    data: nonNull(arg({ type: 'BookCreateInput' })),
  },
  resolve(_parent, args, context: Context) {
    return context.prisma.book.create({
      data: {
        title: args.data.title,
        comments: { create: [{ content: args.data?.comment ?? '' }] },
      },
    });
  },
});

export const Mutations = [
  deleteAuthor,
  createAuthor,
  createBook,
  AuthorCreateInput,
  BookCreateInput,
];
