import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { createContext } from './context';
import { createSchema } from './schema';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './services/redis';
import { createServer } from 'http';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';
//import cors from 'cors';

const createApolloServer = async () => {
  const schema = await createSchema();
  return new ApolloServer({ schema, context: createContext, stopOnTerminationSignals: false });
};

let subscriptionServer: SubscriptionServer;

(async () => {
  const app = express();

  const httpServer = createServer(app);

  const apolloServer = await createApolloServer();

  await apolloServer.start();

  const schema = await createSchema();

  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      name: 'qid',
      secret: 'aslkdfjoiq12312',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 1 years
        sameSite: 'none',
      },
    })
  );

  apolloServer.applyMiddleware({ app }); 

  

 subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: apolloServer.graphqlPath,
    }
  );

  const PORT = 4000;

  httpServer.listen(PORT, () =>
  console.log(`Server is now running on http://localhost:${PORT}/graphql`)
);

})();

process.on('SIGINT', () => subscriptionServer.close());
process.on('SIGERM', () => subscriptionServer.close());

