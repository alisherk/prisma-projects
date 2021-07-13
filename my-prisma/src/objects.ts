import { objectType } from 'nexus';
import { Context } from './context';

const Book = objectType({
  name: 'Book',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.int('id'); 
  },
});

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.nonNull.string('comment')
  },
});

const Author = objectType({
  name: 'Author',
  definition(t) {
    t.nonNull.int('id');
    t.string('name');
    t.nonNull.list.nonNull.field('books', {
      type: 'Book',
      resolve(parent, _args, context: Context) {
        return context.prisma.author
          .findUnique({ where: { id: parent.id } })
          .books();
      },
    });
  },
});

export const ObjectTypes = [Book, Author, Comment]