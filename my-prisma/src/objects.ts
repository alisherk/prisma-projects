import { objectType } from 'nexus';
import { Context } from './context';

const Comment = objectType({
  name: 'Comment', 
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('content');
  }
})


const Book = objectType({
  name: 'Book',
  definition(t) {
    t.nonNull.string('title');
    t.nonNull.int('id'); 
    t.int('authorId');
    t.nonNull.list.nonNull.field('comments', {
      type: 'Comment', 
      //@ts-ignore
      resolve(parent, _args, context: Context) {
        console.log('parent is called in book object', parent)
        return context.prisma.book
         .findUnique({ where: { id: parent.id }})
         .comments()
      }
    })
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