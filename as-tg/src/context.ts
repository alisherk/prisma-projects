import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from './client';
import { ExpressContext } from 'apollo-server-express';

export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}

export const createContext = async ({
  req,
  res,
  connection
}: ExpressContext): Promise<Context> => {

  console.log('connection arg in context', connection);
/*   const authorization = connection
  ? connection.context.authorization // Operation is a Subscription
  : req.headers.authorization; // Operation is a Query/Mutation */
  return {
    prisma,
    req,
    res,
  };
};

export const context = {
  context: prisma,
};
