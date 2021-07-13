import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { context } from './context';

const server = new ApolloServer({
  schema,
  context,
});

server.listen().then(async ({ url }) => {
  console.log(`\
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api
  `);
});
