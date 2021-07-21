import { objectType, stringArg, nonNull, queryField } from 'nexus';
import { Context } from './context';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.nonNull.list.field('authors', {
      type: 'Author',
      resolve(_parent, _args, context: Context) {
        return context.prisma.author.findMany();
      },
    });
    t.nonNull.list.field('books', {
      type: 'Book',
      resolve(_parent, _args, context: Context) {
        return context.prisma.book.findMany();
      },
    });
    t.nonNull.list.field('searchBooks', {
      type: 'Book',
      args: { searchString: nonNull(stringArg()) },
      resolve(_parent, args, context: Context) {
        return context.prisma.book.findMany({
          where: { title: { startsWith: args.searchString } },
        });
      },
    });
  },
});

export const searchAuthor = queryField('searchAuthors', {
  type: 'Query', 
  resolve(_parent, _args, context: Context) {
    return context.prisma.author.findMany({})
  }
})

