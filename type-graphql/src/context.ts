import { PrismaClient } from '@prisma/client';
import { ExpressContext } from 'apollo-server-express';
import { Request, Response } from 'express';
import prisma from './client';

export interface Context {
  prisma: PrismaClient;
  req: Request;
  res: Response;
}

export const createContext = async ({
  req,
  res,
}: ExpressContext): Promise<Context> => {
  return {
    prisma,
    req,
    res,
  };
};

export const context = {
  context: prisma,
};
