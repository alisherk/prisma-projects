import { MiddlewareFn } from 'type-graphql';
import { Context } from '../context';

export const isAuthed: MiddlewareFn<Context> = async ({ context }, next) => {

  //@ts-ignore
  if (!context.req.session) throw new Error('not authed');

  return next();
};
