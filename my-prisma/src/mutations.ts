import { inputObjectType, mutationField, nonNull, intArg, arg } from 'nexus';
import { Context } from './context';

const BookCreateInput = inputObjectType({
    name: 'BookCreateInput',
    definition(t) {
      t.nonNull.string('title');
      t.int('authorId')
    },
  });
  
const CommentCreateInput = inputObjectType({
    name: 'CommentCreateInput',
    definition(t) {
      t.nonNull.string('comment');
    },
  });
  
  const AuthorCreateInput = inputObjectType({
    name: 'AuthorCreateInput',
    definition(t) {
      t.nonNull.string('name');
      t.nonNull.list.nonNull.field('books', { type: 'BookCreateInput' });
      t.nonNull.list.nonNull.field('comments', { type: 'CommentCreateInput'})
    },
  });
  
  const createAuthor = mutationField('createAuthor', {
    type: 'Author',
    args: {
      data: nonNull(arg({ type: 'AuthorCreateInput' })),
    },
    resolve(_parent, args, context: Context) {
      const booksData = args.data.books?.map((book) => ({ title: book.title }));
      const commentData = args.data.comments?.map(comment => ({ comment }))
      return context.prisma.author.create({
        data: { name: args.data.name, books: { create: booksData }, comments: { create: commentData } },
      });
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

  const createDraftBook = mutationField('createDraftBook', {
     type: 'Book', 
     args: {
       data: nonNull(arg({ type: 'BookCreateInput'})),
     }, 
     resolve(_parent, args, context: Context) {
       return context.prisma.book.create({
         data: {
           title: args.data.title, 
           authorId: args.data.authorId
         }
       })
     }
  })

  export const Mutations = [deleteAuthor, createAuthor, createDraftBook, AuthorCreateInput, BookCreateInput, CommentCreateInput]