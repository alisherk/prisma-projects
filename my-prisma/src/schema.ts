import { makeSchema } from 'nexus';
import path from 'path';
import { ObjectTypes } from './objects';
import { Query, searchAuthor } from './queries';
import { Mutations } from './mutations';
import { authorSubscription } from './subscriptions';

export const schema = makeSchema({
  types: [Query, searchAuthor, authorSubscription, ...ObjectTypes, ...Mutations],
  outputs: {
    schema: path.join(__dirname, 'generated/schema.gen.graphql'),
    typegen: path.join(__dirname, 'generated/nexusTypes.gen.ts'),
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
});
