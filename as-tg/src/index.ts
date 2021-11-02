import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { createContext } from './context';
import { createSchema } from './schema';

const createApolloServer = async () => {
  return new ApolloServer({
    schema: await createSchema(),
    context: createContext,
    playground: true,
    subscriptions: {
      onConnect: (connectionParams: any) => {
        console.log('connection params in subscriptions', connectionParams);
      },
    },
  });
};

(async () => {
  const apolloServer = await createApolloServer();
  
  const PORT = 4000;

  await apolloServer.listen(PORT); 

  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
  );
})();
