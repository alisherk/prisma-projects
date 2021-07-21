import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context } from './context';

const server = new ApolloServer({
  schema,
  context,
  playground: true,
  cors: true,
  subscriptions: {
    async onConnect(params) {
      console.log(params);
    },
  },
});

server.listen().then(async ({ url, subscriptionsUrl }) => {
  console.log(`\🚀 Server ready at: ${url}`);
  console.log(`subbscription ready at ${subscriptionsUrl}`)
});
