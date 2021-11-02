import { PrismaClient } from '@prisma/client'
import { MockProxy, mockDeep } from 'jest-mock-extended'; 
import { Request, Response } from 'express';

export type Context = {
  prisma: PrismaClient;
  req: Request; 
  res: Response;
}

export type MockContext = {
  prisma: MockProxy<PrismaClient>
}

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaClient>(),
  }
}