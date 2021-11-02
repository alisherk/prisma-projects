import { graphql } from 'graphql';
import { createSchema } from '../schema';
import { ctx } from './setup'

export const graphqlTestCall = async (query: any, variables?: any) => {
  const schema = await createSchema();
  return graphql(
    schema,
    query,
    undefined,
    {
      prisma: ctx.prisma
    },
    variables
  );
};
